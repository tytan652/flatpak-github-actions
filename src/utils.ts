import * as core from '@actions/core'

import * as fs from 'fs'
import type { PathLike } from 'fs'
import * as path from 'path'

import * as yaml from 'js-yaml'

import { FlatpakBuilderManifest } from './types/flatpak-builder-manifest'

export const parseManifest = (
  manifestPath: PathLike
): FlatpakBuilderManifest => {
  const data = fs.readFileSync(manifestPath)
  switch (path.extname(manifestPath.toString())) {
    case '.json':
      return JSON.parse(data.toString()) as FlatpakBuilderManifest
    case '.yaml':
    case '.yml':
      return yaml.load(data.toString()) as FlatpakBuilderManifest
  }

  throw Error('Unsupported manifest format, please use JSON or YAML')
}

export const checkManifestBranch = (
  manifest: FlatpakBuilderManifest,
  branch: string,
  bundle: boolean = false
): void => {
  if (!manifest.branch) return

  if (manifest.branch === branch)
    core.notice(
      "Flatpak manifest has a branch specified but it matches step's branch"
    )
  else {
    const message =
      "Flatpak manifest has a branch specified that mismatches step's branch"
    if (bundle) throw Error(message)

    core.warning(message)
  }
}

export const getManifestId = (manifest: FlatpakBuilderManifest): string => {
  if (manifest['app-id'])
    core.warning('The use of app-id in Flatpak manifest is deprecated')

  if (manifest.id && manifest['app-id'])
    throw Error(
      'Flatpak manifest has id and app-id specified, remove the latter'
    )

  const id = manifest.id || manifest['app-id']
  if (!id) throw Error('Flatpak manifest has no id specified')

  return id
}
