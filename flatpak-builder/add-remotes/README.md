# Add Remotes step action

This action enables adding Flatpak repos

## Documentation

### Input

- `verbose` - Enable verbosity
- `remotes` - A list of name-URL pairs of Flatpak remotes to add. Members of the pair is separated with a space.

  Example: 
  ``` yaml
  remotes: |
    flathub https://flathub.org/repo/flathub.flatpakrepo
    flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
    gnome-nightly https://nightly.gnome.org/gnome-nightly.flatpakrepo
  ```

### Output

Most of the outputs are meant to be used by other `flatpak-builder` step actions

- `verbose` - Verbosity state given as input
