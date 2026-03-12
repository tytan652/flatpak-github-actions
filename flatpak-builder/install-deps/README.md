# Install Deps step action

This action enables installing dependencies based on a Flatpak manifest

## Documentation

### Input

- `verbose` - `false` - Enable verbosity
- `arch` - optional - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `install-deps-from` - **required** - A name list of Flatpak remotes to install dependencies from. Their order is took in account when flatpak-builder has to install dependencies (first to last).
  Example:
  ```
  flathub-beta
  flathub
  ```
- `state-dir` - optional - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
- `manifest-path` - **required** - Path to the Flatpak manifest

### Output

Most of the outputs are meant to be used by other `flatpak-builder` step actions

- `verbose` - Verbosity state given as input
- `arch` - Machine architecture specified as input
- `state-dir` - State directory used
- `manifest-path` − Path to the Flatpak manifest given as input
