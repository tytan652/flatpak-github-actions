import * as core from '@actions/core'

import * as stages from './stages'
import { BundleConfig } from './stages'

class Config implements BundleConfig {
  verbose: boolean

  arch: string | undefined

  branch: string

  repoDir: string

  isRuntime: boolean
  bundleRuntimeRepo: string | undefined
  bundleName: string
  bundleId: string

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined
    this.branch = core.getInput('branch', { required: true })
    this.repoDir = core.getInput('repo-dir', { required: true })
    this.isRuntime = core.getBooleanInput('is-runtime', { required: true })
    this.bundleRuntimeRepo = core.getInput('runtime-repo') || undefined
    this.bundleName = core.getInput('bundle-name', { required: true })
    this.bundleId = core.getInput('id', { required: true })
  }

  generateOutput(): void {
    core.setOutput(
      'bundle-filename',
      stages.bundleFilenameFromName(this.bundleName)
    )
  }
}

const run = async (): Promise<void> => {
  const config = new Config()

  await stages.checkPrerequisites(config, true)

  await stages.bundle(config)

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
