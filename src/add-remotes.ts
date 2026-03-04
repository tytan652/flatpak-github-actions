import * as core from '@actions/core'

import * as stages from './stages'
import { AddRemotesConfig, Remotes } from './stages'

class Config implements AddRemotesConfig {
  verbose: boolean

  remotes: Remotes[]

  constructor() {
    this.verbose = core.getBooleanInput('verbose')

    const remotes = core.getMultilineInput('remotes', { required: true })
    if (!remotes.length) throw Error('Malformed supplied input: remotes')

    this.remotes = []
    for (const remote of remotes) {
      const remoteSplit: string[] = remote.split(' ')

      if (remoteSplit.length !== 2)
        throw Error(`Malformed name-URL remote pair: ${remote}`)

      this.remotes.push(new Remotes(remoteSplit[0], remoteSplit[1]))
    }
  }

  generateOutput(): void {
    core.setOutput('verbose', this.verbose)

    const remotes: string[] = []
    for (const remote of this.remotes) {
      remotes.push(remote.name)
    }
    core.setOutput('remotes-names', `${remotes.join('\n')}`)
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
