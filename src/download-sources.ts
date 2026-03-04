import * as core from '@actions/core'

import * as stages from './stages'
import { DownloadSourcesConfig } from './stages'

import { defaultStateDir } from './constants'

class Config implements DownloadSourcesConfig {
  verbose: boolean

  arch: string | undefined

  stateDir: string
  manifestPath: string

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined

    this.stateDir = core.getInput('state-dir') || defaultStateDir
    this.manifestPath = core.getInput('manifest-path', { required: true })
  }

  generateOutput(): void {
    core.setOutput('verbose', this.verbose)

    core.setOutput('arch', this.arch)

    core.setOutput('state-dir', this.stateDir)

    core.setOutput('manifest-path', this.manifestPath)
  }
}

const run = async (): Promise<void> => {
  const config = new Config()

  await stages.checkPrerequisites(config)

  await stages.downloadSources(config)

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
