import * as core from '@actions/core'
import * as exec from '@actions/exec'

import { flatpakCmd } from './constants'

interface VerboseConfig {
  verbose: boolean
}

export const checkPrerequisites = async (
  config: VerboseConfig
): Promise<void> => {
  if (config.verbose) core.startGroup('Check pre-requisites')

  if (await exec.exec(flatpakCmd, ['--version'], { silent: !config.verbose }))
    throw Error('Failed to retrieve flatpak version')

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
