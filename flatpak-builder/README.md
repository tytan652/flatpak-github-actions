# Flatpak Builder action

WIP

## Documentation

### Difference with v6

- flatpak-builder 1.4.6 or later is required and the requirement can increase through minor version bump of the action
- `repository-name` and `repository-url` are replaced with `remotes`
  - `remotes` is required since it has no default value
  - Allows to set multiple Flatpak remote
- `arch` is now empty by default, its fallback is flatpak auto-detection
- `branch` is required and no longer fallbacks to `master`
- `build-dir` defaults now to `builddir`
- `stop-at-module` is no longer part of the action but is available through the `build-and-finish` step action
- D-Bus session and virtual X server are no longer provided while building/testing, it is up to the action consumer to setup the enviroment that the action will run on
- OSTree commit subject can be specified
- AppStream compose URL policy is not set to full by default
- `gpg-sign` is replaced with `gpg-key-ids` and support multiple key IDs
- `build-bundle` and `bundle` have been refactored to `bundle` and `bundle-name`
  - It is now assumed that you do not append the name with `.flatpak`, the action will add it itself

### Input

- `verbose` - `false` - Enable verbosity
- `remotes` - **required** - A list of name-URL pairs of Flatpak remotes to add. Members of the pair is separated with a space.
  - Their order is took in account when flatpak-builder has to install dependencies (first to last).
  -  If bundle, the first one will be set as its runtime repo.

  Example: 
  ``` yaml
  remotes: |
    gnome-nightly https://nightly.gnome.org/gnome-nightly.flatpakrepo
    flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
    flathub https://flathub.org/repo/flathub.flatpakrepo
  ```
- `arch` - optional - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `branch` - **required** - Specify the branch to use when exporting the build
  - `test` or `master` are commonly used for test or development builds
- `state-dir` - optional - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
  - It must be on the same filesystem as `build-dir`.
- `build-dir` - optional - Use this directory for storing the build rather than the internal default (`builddir`)
  - It must be on the same filesystem as `state-dir`.
- `repo-dir` - optional - Use this directory as local OSTree repository rather than the internal default (repo)
- `manifest-path` - **required** - Path to the Flatpak manifest to build
- `ccache` - `false` - Enable use of ccache in the build (needs ccache in the sdk)
- `run-tests` - **`true`** - Run modules tests if any
  - If tests requires a specific environment (e.g. D-Bus session, Wayland socket), it is up to the action consumer to provide it.
- `commit-subject` - optional - Specify the commit subject to use when exporting the build in the local OSTree repo
  - Defaults to `Built from ${{ github.sha }}` if a commit SHA is present in the `github` context
- `mirror-screenshots-url` - optional - Specify the URL to mirror screenshots
- `full-compose-url-policy` - **`false`** - Enable the full policy of AppStream compose URL policy (partial being flatpak-builder default). No-op if `mirror-screenshots-url` is not specified.
- `gpg-key-ids` - optional - GPG key IDs to sign the OSTree commit with

  Example:
  ```yaml
  gpg-key-ids: |
    3AA5C34371567BD2
    2DB76517343C5AA3
  ```
- `bundle` - **`true`** -  Generate a bundle with the application
- `bundle-name` - optional - Name of the bundle, used for the bundle filename. It will be automatically appended with the .flatpak extension. Technically no-op if bundle is set to false.
  - Defaults to `'manifest-id'-'arch'` or `'manifest-id'` depending on if `arch` was explicitly set

### Output

- `state-dir` - State directory used
- `build-dir` - Build directory used
- `repo-dir` − Repo directory used
- `bundle-filename` - Filename of the generated bundle
