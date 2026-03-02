import * as core from '@actions/core'

import * as stages from './stages'
import { AddRemotesConfig, Remotes } from './stages'

class Config implements AddRemotesConfig {
  verbose: boolean

  remotes: Remotes[] | undefined

  constructor() {
    this.verbose = core.getBooleanInput('verbose')

    const remotes = core.getMultilineInput('remotes') || undefined
    if (remotes) {
      this.remotes = []
      for (const remote of remotes) {
        const remoteSplit: string[] = remote.split(' ')

        this.remotes.push(new Remotes(remoteSplit[0], remoteSplit[1]))
      }
    } else {
      throw Error('No remote provided')
    }
  }

  generateOutput(): void {
    core.setOutput('verbose', this.verbose)
  }
}

const run = async (): Promise<void> => {
  const config = new Config()

  await stages.checkPrerequisites(config)

  await stages.addRemotes(config)

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
