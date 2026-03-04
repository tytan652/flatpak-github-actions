import * as core from '@actions/core'

import * as stages from './stages'
import {
  AddRemotesConfig,
  DownloadSourcesConfig,
  InstallDependenciesConfig,
  Remotes
} from './stages'

import { defaultStateDir } from './constants'

class Config
  implements AddRemotesConfig, InstallDependenciesConfig, DownloadSourcesConfig
{
  verbose: boolean

  remotes: stages.Remotes[] | undefined

  arch: string | undefined

  installDepsFrom: string[] | undefined

  stateDir: string
  manifestPath: string

  constructor() {
    this.verbose = core.getBooleanInput('verbose', { required: true })

    this.arch = core.getInput('arch') || undefined
    this.stateDir = core.getInput('state-dir') || defaultStateDir
    this.manifestPath = core.getInput('manifest-path', { required: true })

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
    } else {
      this.remotes = undefined
      this.installDepsFrom = undefined
    }
  }

  generateOutput(): void {
    core.setOutput('state-dir', this.stateDir)
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

  config.generateOutput()
}

// eslint-disable-next-line github/no-then
run().catch((e: Error) => {
  core.setFailed(e.message)
})
