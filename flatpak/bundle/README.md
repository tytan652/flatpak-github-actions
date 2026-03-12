# Flatpak Bundle step action

This action enables bundle a Flatpak from a local OSTree repository

## Documentation

### Input

- `verbose` - `false` - Enable verbosity
- `arch` - optional - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `branch` - **required** - Specify the branch to bundle
- `repo-dir` - **required** -  Directory of the local OSTree repository
- `is-runtime` - `false` - Enable to export a runtime instead of an application
- `runtime-repo` - optional - Specify the URL of the Flatpak remote that that supplies the runtimes required by the app
- `bundle-name` - **required** − Name of the bundle, used for the bundle filename. It will be automatically appended with the .flatpak extension.
- `id` - **required** - Id of the app/runtime to bundle

### Output

- `bundle-filename` - Filename of the generated bundle
