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
  branch: string
): void => {
  if (!manifest.branch) return

  if (manifest.branch === branch)
    core.notice(
      "Flatpak manifest has a branch specified but it matches step's branch"
    )
  else
    core.warning(
      "Flatpak manifest has a branch specified that mismatches step's branch"
    )
}
