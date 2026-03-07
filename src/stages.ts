import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as io from '@actions/io'

import * as semver from 'semver'

import {
  defaultBuildDir,
  flatpakBuilderCmd,
  flatpakBuilderMinVersion,
  flatpakCmd
} from './constants'

interface VerboseConfig {
  verbose: boolean
}

interface ArchConfig {
  arch: string | undefined
}

interface BranchConfig {
  branch: string
}

interface BuildDirConfig {
  buildDir: string
}

interface RepoDirConfig {
  repoDir: string
}

interface BuilderCommonConfig extends VerboseConfig, ArchConfig {
  stateDir: string
  manifestPath: string
}

const checkFlatpakBuilder = async (config: VerboseConfig): Promise<void> => {
  const versionExec = await exec.getExecOutput(
    flatpakBuilderCmd,
    ['--version'],
    { silent: !config.verbose }
  )

  if (versionExec.exitCode)
    throw Error('Failed to retrive flatpak-builder version')

  const version = versionExec.stdout.replace(/^flatpak-builder-/, '').trim()
  if (!semver.valid(version))
    throw Error(`flatpak-builder version is not a valid semver: ${version}`)

  if (semver.lt(version, flatpakBuilderMinVersion))
    throw Error(
      `flatpak-builder ${flatpakBuilderMinVersion} or later is required, found ${version}`
    )
}

export const checkPrerequisites = async (
  config: VerboseConfig
): Promise<void> => {
  if (config.verbose) core.startGroup('Check pre-requisites')

  if (await exec.exec(flatpakCmd, ['--version'], { silent: !config.verbose }))
    throw Error('Failed to retrieve flatpak version')

  await checkFlatpakBuilder(config)

  if (config.verbose) core.endGroup()
}

export class Remotes {
  name: string
  url: string

  constructor(name: string, url: string) {
    this.name = name
    this.url = url
  }
}

export interface AddRemotesConfig extends VerboseConfig {
  remotes: Remotes[] | undefined
}

export const addRemotes = async (config: AddRemotesConfig): Promise<void> => {
  if (!config.remotes) return

  const commonArgs: string[] = ['remote-add', '--if-not-exists']

  if (config.verbose) commonArgs.push('--verbose')

  for (const remote of config.remotes) {
    const args: string[] = [...commonArgs, remote.name, remote.url]

    await exec.exec(flatpakCmd, args)
  }
}

const runFlatpakBuilderWithFakeBuildDir = async (
  args: string[],
  config: BuilderCommonConfig
): Promise<void> => {
  const fakeBuildDir = `${config.stateDir}/${defaultBuildDir}`

  args.push('--assumeyes', `--state-dir=${config.stateDir}`)

  if (config.verbose) args.push('--verbose')

  if (config.arch) args.push(`--arch${config.arch}`)

  // NOTE: Build dir is required but is not created
  args.push(fakeBuildDir, config.manifestPath)

  await exec.exec(flatpakBuilderCmd, args)

  // Remove ccache state
  await io.rmRF(`${config.stateDir}/ccache`)

  // Remove non-existant build dir just in case
  await io.rmRF(fakeBuildDir)
}

export interface InstallDependenciesConfig extends BuilderCommonConfig {
  installDepsFrom: string[] | undefined
}

export const installDependencies = async (
  config: InstallDependenciesConfig
): Promise<void> => {
  if (!config.installDepsFrom) return

  const args: string[] = ['--install-deps-only']

  for (const remote of config.installDepsFrom) {
    args.push(`--install-deps-from=${remote}`)
  }

  await runFlatpakBuilderWithFakeBuildDir(args, config)
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DownloadSourcesConfig extends BuilderCommonConfig {}

export const downloadSources = async (
  config: DownloadSourcesConfig
): Promise<void> => {
  await runFlatpakBuilderWithFakeBuildDir(['--download-only'], config)
}

export interface BuildAndFinishConfig
  extends BranchConfig, BuilderCommonConfig, BuildDirConfig {
  ccache: boolean
  stopAtModule: string | undefined
}

export const buildAndFinish = async (
  config: BuildAndFinishConfig
): Promise<void> => {
  const commonArgs: string[] = [
    '--assumeyes',
    '--disable-rofiles-fuse',
    `--state-dir=${config.stateDir}`
  ]
  const buildArgs: string[] = [
    '--disable-download',
    '--force-clean',
    '--build-only'
  ]
  const finishArgs: string[] = [
    '--finish-only',
    `--default-branch=${config.branch}`
  ]

  if (config.verbose) commonArgs.push('--verbose')

  if (config.arch) commonArgs.push(`--arch=${config.arch}`)

  if (config.ccache) buildArgs.push('--ccache')

  if (config.stopAtModule)
    buildArgs.push(`--stop-at-module=${config.stopAtModule}`)

  commonArgs.push(config.buildDir, config.manifestPath)
  buildArgs.push(...commonArgs)

  await exec.exec(flatpakBuilderCmd, buildArgs)

  if (config.stopAtModule) return

  finishArgs.push(...commonArgs)
  await exec.exec(flatpakBuilderCmd, finishArgs)
}

export interface ExportBuildConfig
  extends BranchConfig, BuilderCommonConfig, BuildDirConfig, RepoDirConfig {
  commitSubject: string | undefined
  mirrorScreenshotsUrl: string | undefined
  fullComposeUrlPolicy: boolean
}

export const exportBuild = async (config: ExportBuildConfig): Promise<void> => {
  const args: string[] = [
    '--assumeyes',
    '--export-only',
    `--state-dir=${config.stateDir}`,
    `--repo=${config.repoDir}`,
    `--default-branch=${config.branch}`
  ]

  if (config.verbose) args.push('--verbose')

  if (config.arch) args.push(`--arch=${config.arch}`)

  if (config.commitSubject) args.push(`--subject=${config.commitSubject}`)

  if (config.mirrorScreenshotsUrl) {
    args.push(`--mirror-screenshots-url=${config.mirrorScreenshotsUrl}`)

    if (config.fullComposeUrlPolicy) args.push('--compose-url-policy=full')
    else args.push('--compose-url-policy=partial')
  }

  args.push(config.buildDir, config.manifestPath)

  await exec.exec(flatpakBuilderCmd, args)
}
