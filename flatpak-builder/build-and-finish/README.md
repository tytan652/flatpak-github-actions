# Build And Finish step action

This action enabled building and finishing a Flatpak following its manifest

## Documentation

### Input

- `verbose` - Enable verbosity
- `arch` - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `branch` - Specify the branch to use when finshing the build
  - `test` or `master` are commonly used for test or development builds
- `state-dir` - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
  - It must be on the same filesystem as `build-dir`.
- `build-dir` - Use this directory for storing the build rather than the internal default (`builddir`)
  - It must be on the same filesystem as `state-dir`.
- `manifest-path` - Path to the Flatpak manifest
- `ccache` - Enable use of ccache in the build (needs ccache in the sdk)
- `stop-at-module` - Stop at the specified module, ignoring it and all the following ones
- `run-tests` - Run modules tests if any
  - If tests requires a specific environment (e.g. D-Bus session, Wayland socket), it is up to the action consumer to provide it.

### Output

Most of the outputs are meant to be used by other `flatpak-builder` step actions

- `verbose` - Verbosity state given as input
- `arch` - Machine architecture specified as input
- `branch` - Branch given as input
- `state-dir` - State directory used
- `build-dir` − Build directory used
- `manifest-path` − Path to the Flatpak manifest given as input
