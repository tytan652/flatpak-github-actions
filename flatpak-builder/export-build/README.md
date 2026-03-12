# Export Build step action

This action enables exporting a Flatpak following its manifest

## Documentation

### Input

- `verbose` - `false` - Enable verbosity
- `arch` - optional - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `branch` - **required** - Specify the branch to use when finshing the build
  - `test` or `master` are commonly used for test or development builds
- `state-dir` - optional - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
  - It must be on the same filesystem as `build-dir`.
- `build-dir` - optional - Use this directory for storing the build rather than the internal default (`builddir`)
  - It must be on the same filesystem as `state-dir`.
- `repo-dir` - optional - Use this directory as local OSTree repository rather than the internal default (repo)
- `manifest-path` - **required** - Path to the Flatpak manifest
- `commit-subject` - optional - Specify the commit subject to use when exporting the build in the local OSTree repo
  - If not set, the subject is created by the internal Flatpak command
- `mirror-screenshots-url` - optional - Specify the URL to mirror screenshots
- `full-compose-url-policy` - `false` - Enable the full policy of AppStream compose URL policy (partial being flatpak-builder default). No-op if `mirror-screenshots-url` is not specified.

### Output

Most of the outputs are meant to be used by other `flatpak-builder` step actions

- `verbose` - Verbosity state given as input
- `arch` - Machine architecture specified as input
- `branch` - Branch given as input
- `repo-dir` − Repo directory used
- `manifest-id` - Id found in the manifest
