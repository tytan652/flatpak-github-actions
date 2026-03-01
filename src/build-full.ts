import * as core from '@actions/core'

import * as stages from './stages'
import { AddRemotesConfig, Remotes } from './stages'

class Config implements AddRemotesConfig {
  verbose: boolean

  remotes: stages.Remotes[] | undefined

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
      this.remotes = undefined
    }
  }
}

const run = async (config: Config): Promise<void> => {
  await stages.checkPrerequisites(config)

  if (config.remotes) {
    await core.group('Add remotes', async () => {
      await stages.addRemotes(config)
    })
  }
}

run(new Config()).catch((e: Error) => {
  core.setFailed(e.message)
})
