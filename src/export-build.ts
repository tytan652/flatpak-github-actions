import * as core from '@actions/core'

import * as stages from './stages'
import { ExportBuildConfig } from './stages'

import { defaultBuildDir, defaultRepoDir, defaultStateDir } from './constants'

class Config implements ExportBuildConfig {
  verbose: boolean

  arch: string | undefined

  branch: string

  buildDir: string

  repoDir: string

  stateDir: string
  manifestPath: string

  commitSubject: string | undefined
  mirrorScreenshotsUrl: string | undefined
  fullComposeUrlPolicy: boolean

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined
    this.branch = core.getInput('branch', { required: true })
    this.stateDir = core.getInput('state-dir') || defaultStateDir
    this.buildDir = core.getInput('build-dir') || defaultBuildDir
    this.repoDir = core.getInput('repo-dir') || defaultRepoDir
    this.manifestPath = core.getInput('manifest-path', { required: true })
    this.commitSubject = core.getInput('commit-subject') || undefined
    this.mirrorScreenshotsUrl =
      core.getInput('mirror-screenshots-url') || undefined
    this.fullComposeUrlPolicy = core.getBooleanInput(
      'full-compose-url-policy',
      { required: true }
    )
  }

  generateOutput(): void {
    core.setOutput('verbose', this.verbose)

    core.setOutput('arch', this.arch)

    core.setOutput('branch', this.branch)

    core.setOutput('repo-dir', this.repoDir)
  }
}

const run = async (): Promise<void> => {
  const config = new Config()

  await stages.checkPrerequisites(config)

  await stages.exportBuild(config)

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
