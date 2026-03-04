# Flatpak Builder action

WIP

## Documentation

### Input

- `verbose` - Enable verbosity
- `remotes` - A list of name-URL pairs of Flatpak remotes to add. Members of the pair is separated with a space.
  - Their order is took in account when flatpak-builder has to install dependencies (first to last).
- `arch` - Specify the machine architecture to build for (e.g. `x86_64`, `aarch64`). If no architecture is specified, the host architecture will be automatically detected.
- `state-dir` - Use this directory for storing state (downloads, build dirs, build cache, etc) rather than the internal default (`.flatpak-builder`)
- `manifest-path` - Path to the Flatpak manifest to build

  Example: 
  ``` yaml
  remotes: |
    gnome-nightly https://nightly.gnome.org/gnome-nightly.flatpakrepo
    flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
    flathub https://flathub.org/repo/flathub.flatpakrepo
  ```

### Output

- `state-dir` - State directory used
