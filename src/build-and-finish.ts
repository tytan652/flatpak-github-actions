import * as core from '@actions/core'

import * as stages from './stages'
import { BuildAndFinishConfig } from './stages'

import { defaultBuildDir, defaultStateDir } from './constants'
import * as utils from './utils'

class Config implements BuildAndFinishConfig {
  verbose: boolean

  arch: string | undefined

  branch: string

  buildDir: string

  stateDir: string
  manifestPath: string

  ccache: boolean
  stopAtModule: string | undefined
  runTests: boolean

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined
    this.branch = core.getInput('branch', { required: true })
    this.stateDir = core.getInput('state-dir') || defaultStateDir
    this.buildDir = core.getInput('build-dir') || defaultBuildDir
    this.manifestPath = core.getInput('manifest-path', { required: true })
    this.ccache = core.getBooleanInput('ccache', { required: true })
    this.stopAtModule = core.getInput('stop-at-module') || undefined
    this.runTests = core.getBooleanInput('run-tests', { required: true })
  }

  generateOutput(): void {
    core.setOutput('verbose', this.verbose)

    core.setOutput('arch', this.arch)

    core.setOutput('branch', this.branch)

    core.setOutput('state-dir', this.stateDir)

    core.setOutput('build-dir', this.buildDir)

    core.setOutput('manifest-path', this.manifestPath)
  }
}

const run = async (): Promise<void> => {
  const config = new Config()
  const manifest = utils.parseManifest(config.manifestPath)

  await stages.checkPrerequisites(config, {
    flatpak: true,
    flatpakBuilder: true
  })

  utils.checkManifestBranch(manifest, config.branch)

  await stages.buildAndFinish(config)

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
