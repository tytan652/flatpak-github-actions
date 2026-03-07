# Download Sources step action

This action enables download sources from a Flatpak manifest

## Documentation

### Input

- `verbose` - Enable verbosity
- `arch` - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `state-dir` - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
- `manifest-path` - Path to the Flatpak manifest

### Output

Most of the outputs are meant to be used by other `flatpak-builder` step actions

- `verbose` - Verbosity state given as input
- `arch` - Machine architecture specified as input
- `state-dir` - State directory used
- `manifest-path` − Path to the Flatpak manifest given as input
