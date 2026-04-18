export const flatpakBuilderCmd = 'flatpak-builder'
export const flatpakCmd = 'flatpak'
export const flatManagerClientCmd = 'flat-manager-client'

export const defaultStateDir = '.flatpak-builder'
export const defaultBuildDir = 'builddir'
export const defaultRepoDir = 'repo'

// 1.4.5 - Support committing mirrored media as screenshot ref to exported repo
// 1.4.6 - Support specifying appstream compose URL policy with `--compose-url-policy` argument
export const flatpakBuilderMinVersion = '1.4.6'

// 0.5.0 - Client ported to rust and now versionned alongside flat-manger
// 0.5.1 - Include static deltas bugfixes
export const flatManagerClientMinVersion = '0.5.1'
