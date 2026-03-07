# Flatpak Builder action

WIP

## Documentation

### Difference with v6

- flatpak-builder 1.4.6 or later is required and the requirement can increase through minor version bump of the action
- `stop-at-module` is no longer part of the action but is available through the `build-and-finish` step action

### Input

- `verbose` - Enable verbosity
- `remotes` - A list of name-URL pairs of Flatpak remotes to add. Members of the pair is separated with a space.
  - Their order is took in account when flatpak-builder has to install dependencies (first to last).
  -  If bundle, the first one will be set as its runtime repo.

  Example: 
  ``` yaml
  remotes: |
    gnome-nightly https://nightly.gnome.org/gnome-nightly.flatpakrepo
    flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
    flathub https://flathub.org/repo/flathub.flatpakrepo
  ```
- `arch` - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `branch` - Specify the branch to use when exporting the build
  - `test` or `master` are commonly used for test or development builds
- `state-dir` - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
  - It must be on the same filesystem as `build-dir`.
- `build-dir` - Use this directory for storing the build rather than the internal default (`builddir`)
  - It must be on the same filesystem as `state-dir`.
- `repo-dir` - Use this directory as local OSTree repository rather than the internal default (repo)
- `manifest-path` - Path to the Flatpak manifest to build
- `ccache` - Enable use of ccache in the build (needs ccache in the sdk)
- `commit-subject` - Specify the commit subject to use when exporting the build in the local OSTree repo
  - Defaults to `Built from ${{ github.sha }}` if a commit SHA is present in the `github` context
- `mirror-screenshots-url` - Specify the URL to mirror screenshots
- `full-compose-url-policy` - Enable the full policy of AppStream compose URL policy (partial being flatpak-builder default). No-op if `mirror-screenshots-url` is not specified.
- `bundle` -  Generate a bundle with the application
- `bundle-name` - Name of the bundle, used for the bundle filename. It will be automatically appended with the .flatpak extension. Technically no-op if bundle is set to false.

### Output

- `state-dir` - State directory used
- `build-dir` - Build directory used
- `repo-dir` − Repo directory used
- `bundle-filename` - Filename of the generated bundle
