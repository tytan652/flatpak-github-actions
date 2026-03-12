import * as core from '@actions/core'

import * as stages from './stages'
import {
  AddRemotesConfig,
  BuildAndFinishConfig,
  BundleConfig,
  DownloadSourcesConfig,
  ExportBuildConfig,
  InstallDependenciesConfig,
  Remotes
} from './stages'

import { defaultBuildDir, defaultRepoDir, defaultStateDir } from './constants'
import * as utils from './utils'

class Config
  implements
    AddRemotesConfig,
    InstallDependenciesConfig,
    DownloadSourcesConfig,
    BuildAndFinishConfig,
    ExportBuildConfig,
    BundleConfig
{
  verbose: boolean

  remotes: stages.Remotes[] | undefined

  arch: string | undefined

  installDepsFrom: string[] | undefined

  branch: string

  buildDir: string

  repoDir: string

  stateDir: string
  manifestPath: string

  ccache: boolean
  stopAtModule: undefined
  runTests: boolean

  commitSubject: string | undefined
  mirrorScreenshotsUrl: string | undefined
  fullComposeUrlPolicy: boolean

  isRuntime: boolean
  bundleRuntimeRepo: string | undefined
  bundleName: string
  bundleId: string

  bundle: boolean

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined
    this.branch = core.getInput('branch', { required: true })
    this.stateDir = core.getInput('state-dir') || defaultStateDir
    this.buildDir = core.getInput('build-dir') || defaultBuildDir
    this.repoDir = core.getInput('repo-dir') || defaultRepoDir
    this.manifestPath = core.getInput('manifest-path', { required: true })
    this.ccache = core.getBooleanInput('ccache', { required: true })
    this.runTests = core.getBooleanInput('run-tests', { required: true })
    this.commitSubject = core.getInput('commit-subject') || undefined
    this.mirrorScreenshotsUrl =
      core.getInput('mirror-screenshots-url') || undefined
    this.fullComposeUrlPolicy = core.getBooleanInput(
      'full-compose-url-policy',
      { required: true }
    )

    const remotes = core.getMultilineInput('remotes') || undefined
    if (remotes) {
      if (!remotes.length) throw Error('Malformed supplied input: remotes')

      this.remotes = []
      this.installDepsFrom = []
      for (const remote of remotes) {
        const remoteSplit: string[] = remote.split(' ')

        if (remoteSplit.length !== 2)
          throw Error(`Malformed name-URL remote pair: ${remote}`)

        this.remotes.push(new Remotes(remoteSplit[0], remoteSplit[1]))
        this.installDepsFrom.push(remoteSplit[0])
      }
      this.bundleRuntimeRepo = this.remotes[0].url
    } else {
      this.remotes = undefined
      this.installDepsFrom = undefined
      this.bundleRuntimeRepo = undefined
    }

    const manifest = utils.parseManifest(this.manifestPath)
    this.bundle = core.getBooleanInput('bundle', { required: true })

    this.isRuntime = false

    utils.checkManifestBranch(manifest, this.branch, this.bundle)
    this.bundleId = utils.getManifestId(manifest)

    this.bundleName = core.getInput('bundle-name')
    if (!this.bundleName)
      this.bundleName =
        (this.arch && `${this.bundleId}-${this.arch}`) || `${this.bundleId}`
  }

  generateOutput(): void {
    core.setOutput('state-dir', this.stateDir)

    core.setOutput('build-dir', this.buildDir)

    core.setOutput('repo-dir', this.repoDir)

    if (this.bundle)
      core.setOutput(
        'bundle-filename',
        stages.bundleFilenameFromName(this.bundleName)
      )
  }
}

const run = async (): Promise<void> => {
  const config = new Config()

  await stages.checkPrerequisites(config)

  if (config.remotes) {
    await core.group('Add remotes', async () => {
      await stages.addRemotes(config)
    })
  }

  if (config.installDepsFrom) {
    await core.group('Install dependencies', async () => {
      await stages.installDependencies(config)
    })
  }

  await core.group('Download sources', async () => {
    await stages.downloadSources(config)
  })

  await core.group('Build and finish', async () => {
    await stages.buildAndFinish(config)
  })

  await core.group('Export build', async () => {
    await stages.exportBuild(config)
  })

  await core.group('Bundle', async () => {
    await stages.bundle(config)
  })

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
