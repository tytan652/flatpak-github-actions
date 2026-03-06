/* Generated from flatpak-builder 1.4.7 manifest schema with json-schema-to-typescript */

export type FlatpakBuilderManifest = {
  [k: string]: unknown
} & {
  /**
   * @deprecated
   * A string defining the application id.
   */
  'app-id'?: string
  /**
   * A string defining the application id.
   */
  id?: string
  /**
   * The branch to use when exporting the application. If this is unset the defaults come from the default-branch option.
   */
  branch?: string
  /**
   * The default branch to use when exporting the application. Defaults to master. This key can be overridden by the --default-branch commandline option.
   */
  'default-branch'?: string
  /**
   * The collection ID of the repository, defaults to being unset. Setting a globally unique collection ID allows the apps in the repository to be shared over peer to peer systems without needing further configuration. If building in an existing repository, the collection ID must match the existing configured collection ID for that repository.
   */
  'collection-id'?: string
  /**
   * If building an extension, the tag for the extension point to use. Since flatpak 0.11.4 a runtime may define multiple locations for the same extension point with the intention that different branches for the extension are mounted at each location. When building an extension it is necessary to know what extension point to install the extension to. This option resolves any ambiguity in which extension point to choose. If not specified, the default choice is to install into either the only location for the extension point or into the location for the untagged extension point. If there are multiple locations for the same extension point defined with different tags then an error will occur.
   */
  'extension-tag'?: string
  /**
   * The name of the runtime that the application uses.
   */
  runtime?: string
  /**
   * The version of the runtime that the application uses, defaults to master.
   */
  'runtime-version'?: string
  /**
   * The name of the development runtime that the application builds with.
   */
  sdk?: string
  /**
   * Initialize the (otherwise empty) writable /var in the build with a copy of this runtime.
   */
  var?: string
  /**
   * Use this file as the base metadata file when finishing.
   */
  metadata?: string
  /**
   * The filename or path to the main binary of the application. Note that this is really just a single file, not a commandline. If you want to pass arguments, install a shell script wrapper and use that as the command. Also note that the command is used when the application is run via flatpak run, and does not affect what gets executed when the application is run in other ways, e.g. via the desktop file or D-Bus activation.
   */
  command?: string
  /**
   * Build a new runtime instead of an application.
   */
  'build-runtime'?: boolean
  /**
   * Build an extension.
   */
  'build-extension'?: boolean
  /**
   * Separate out locale files and translations to an extension runtime. Defaults to true.
   */
  'separate-locales'?: boolean
  /**
   * When building a runtime sdk, also create a platform based on it with this id.
   */
  'id-platform'?: string
  /**
   * The metadata file to use for the platform we create.
   */
  'metadata-platform'?: string
  /**
   * If true, use a writable copy of the sdk for /usr. Defaults to true if build-runtime is specified.
   */
  'writable-sdk'?: boolean
  /**
   * Run appstream-compose during cleanup phase. Defaults to true.
   */
  'appstream-compose'?: boolean
  /**
   * Install these extra sdk extensions in /usr.
   */
  'sdk-extensions'?: string[]
  /**
   * Install these extra sdk extensions when creating the platform.
   */
  'platform-extensions'?: string[]
  /**
   * Start with the files from the specified application. This can be used to create applications that extend another application.
   */
  base?: string
  /**
   * Use this specific version of the application specified in base. If unspecified, this uses the value specified in branch
   */
  'base-version'?: string
  /**
   * Install these extra extensions from the base application when initializing the application directory.
   */
  'base-extensions'?: string[]
  /**
   * Inherit these extra extension points from the base application or sdk when finishing the build.
   */
  'inherit-extensions'?: string[]
  /**
   * Inherit these extra extension points from the base application or sdk when finishing the build, but do not inherit them into the platform.
   */
  'inherit-sdk-extensions'?: string[]
  /**
   * Add these tags to the metadata file.
   */
  tags?: string[]
  'build-options'?: BuildOptions
  modules?: Modules
  /**
   * This is a dictionary of extension objects. The key is the name of the extension.
   */
  'add-extensions'?: {
    [k: string]: Extension
  }
  /**
   * This is a dictionary of extension objects similar to add-extensions. The main difference is that the extensions are added early and are available for use during the build.
   */
  'add-build-extensions'?: {
    [k: string]: Extension
  }
  /**
   * An array of file patterns that should be removed at the end. Patterns starting with / are taken to be full pathnames (without the /app prefix), otherwise they just match the basename.
   */
  cleanup?: string[]
  /**
   * An array of commandlines that are run during the cleanup phase.
   */
  'cleanup-commands'?: string[]
  /**
   * Extra files to clean up in the platform.
   */
  'cleanup-platform'?: string[]
  /**
   * An array of commandlines that are run during the cleanup phase of the platform.
   */
  'cleanup-platform-commands'?: string[]
  /**
   * An array of commandlines that are run after importing the base platform, but before applying the new files from the sdk. This is a good place to e.g. delete things from the base that may conflict with the files added in the sdk.
   */
  'prepare-platform-commands'?: string[]
  /**
   * An array of arguments passed to the flatpak build-finish command.
   */
  'finish-args'?: string[]
  /**
   * Any desktop file with this name will be renamed to a name based on id during the cleanup phase.
   */
  'rename-desktop-file'?: string
  /**
   * Any appdata (metainfo) file with this name will be renamed to a name based on id during the cleanup phase.
   */
  'rename-appdata-file'?: string
  /**
   * Any mimetypes file with this name will me renamed to a name based on id during the cleanup phase.
   */
  'rename-mime-file'?: string
  /**
   * Any icon with this name will be renamed to a name based on id during the cleanup phase. Note that this is the icon name, not the full filenames, so it should not include a filename extension.
   */
  'rename-icon'?: string
  /**
   * Any mime icons with any of these names will be renamed to a name prefixed with id during the cleanup phase. Note that this is the icon name, not the full filenames, so it should not include a filename extension.
   */
  'rename-mime-icons'?: string[]
  /**
   * Replace the appdata (metainfo) project_license field with this string. This is useful as the upstream license is typically only about the application itself, whereas the bundled app can contain other licenses too.
   */
  'appdata-license'?: string
  /**
   * If rename-icon is set, keep a copy of the old icon file.
   */
  'copy-icon'?: boolean
  /**
   * This string will be prefixed to the Name key in the main application desktop file.
   */
  'desktop-file-name-prefix'?: string
  /**
   * This string will be suffixed to the Name key in the main application desktop file.
   */
  'desktop-file-name-suffix'?: string
}
/**
 * An array of objects specifying the modules to be built in order. String members in the array are interpreted as the name of a separate json or yaml file that contains a module.
 */
export type Modules = {
  [k: string]: unknown
}[]
/**
 *  These contain a pointer to the source that will be extracted into the source directory before the build starts. They can be of several types, distinguished by the type property. Additionally, the sources list can contain a plain string, which is interpreted as the name of a separate json or yaml file that is read and inserted at this point. The file can contain a single source, or an array of sources.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source".
 */
export type Source = {
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * Type of the source.
   */
  type:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  [k: string]: unknown
} & {
  [k: string]: unknown
}
/**
 * If non-empty, only build the module on the arches listed.
 */
export type OnlyArches = string[]
/**
 * Don't build on any of the arches listed.
 */
export type SkipArches = string[]
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-archive".
 */
export type SourceArchive = {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The path of the archive.
   */
  path?: string
  /**
   * The URL of a remote archive that will be downloaded. This overrides path if both are specified.
   */
  url?: string
  /**
   * A list of alternative urls that are used if the main url fails.
   */
  'mirror-urls'?: string[]
  /**
   * Sets the HTTP "Referer" header when downloading the archive.
   */
  referer?: string
  /**
   * Disables decompression of downloads over HTTP for misconfigured servers.
   */
  'disable-http-decompression'?: boolean
  /**
   * The type of archive if it cannot be guessed from the path.
   */
  'archive-type'?:
    | 'rpm'
    | 'tar'
    | 'tar-gzip'
    | 'tar-compress'
    | 'tar-bzip2'
    | 'tar-lzip'
    | 'tar-lzma'
    | 'tar-lzop'
    | 'tar-xz'
    | 'tar-zst'
    | 'zip'
    | '7z'
  /**
   * Whether to initialise the repository as a git repository.
   */
  'git-init'?: boolean
  /**
   * @deprecated
   * The md5 checksum of the file, verified after download. Note that md5 is no longer considered a safe checksum, we recommend you use at least sha256.
   */
  md5?: string
  /**
   * @deprecated
   * The sha1 checksum of the file, verified after download. Note that sha1 is no longer considered a safe checksum, we recommend you use at least sha256.
   */
  sha1?: string
  /**
   * The sha256 checksum of the file, verified after download.
   */
  sha256?: string
  /**
   * The sha512 checksum of the file, verified after download.
   */
  sha512?: string
  /**
   * The number of initial pathname components to strip during extraction. Defaults to 1.
   */
  'strip-components'?: number
  /**
   * Filename to for the downloaded file, defaults to the basename of url.
   */
  'dest-filename'?: string
} & SourceArchive1
export type SourceArchive1 = {
  [k: string]: unknown
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-git".
 */
export type SourceGit = {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The path to a local checkout of the git repository. Due to how git-clone works, this will be much faster than specifying a URL of file:///...
   */
  path?: string
  /**
   * URL of the git repository. This overrides path if both are specified. When using git via SSH, the correct syntax is ssh://user@domain/path/to/repo.git.
   */
  url?: string
  /**
   * The branch to use from the git repository.
   */
  branch?: string
  /**
   * The tag to use from the git repository.
   */
  tag?: string
  /**
   * The commit to use from the git repository. If branch is also specified, then it is verified that the branch/tag is at this specific commit. This is a readable way to document that you're using a particular tag, but verify that it does not change.
   */
  commit?: string
  /**
   * Don't use transfer.fsckObjects=1 to mirror git repository. This may be needed for some (broken) repositories.
   */
  'disable-fsckobjects'?: boolean
  /**
   * Don't optimize by making a shallow clone when downloading the git repo.
   */
  'disable-shallow-clone'?: boolean
  /**
   * Don't checkout the git submodules when cloning the repository.
   */
  'disable-submodules'?: boolean
  /**
   * Don't explicitly fetch or checkout LFS git objects.
   */
  'disable-lfs'?: boolean
} & SourceGit1
export type SourceGit1 = {
  [k: string]: unknown
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-file".
 */
export type SourceFile = {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The path of a local file that will be copied into the source dir.
   */
  path?: string
  /**
   * The URL of a remote file that will be downloaded and copied into the source dir. This overrides path if both are specified.
   */
  url?: string
  /**
   * Sets the HTTP "Referer" header when downloading the file.
   */
  referer?: string
  /**
   * Disables decompression of downloads over HTTP for misconfigured servers.
   */
  'disable-http-decompression'?: boolean
  /**
   * A list of alternative urls that are used if the main url fails.
   */
  'mirror-urls'?: string[]
  /**
   * @deprecated
   * The md5 checksum of the file, verified after download. Note that md5 is no longer considered a safe checksum, we recommend you use at least sha256.
   */
  md5?: string
  /**
   * @deprecated
   * The sha1 checksum of the file, verified after download. Note that sha1 is no longer considered a safe checksum, we recommend you use at least sha256.
   */
  sha1?: string
  /**
   * The sha256 checksum of the file, verified after download.
   */
  sha256?: string
  /**
   * The sha512 checksum of the file, verified after download.
   */
  sha512?: string
  /**
   * Filename to for the downloaded file, defaults to the basename of url.
   */
  'dest-filename'?: string
} & SourceFile1
export type SourceFile1 = {
  [k: string]: unknown
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-patch".
 */
export type SourcePatch = {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The path of a patch file that will be applied in the source dir.
   */
  path?: string
  /**
   * An list of paths to patch files that will be applied in the source dir, in order.
   */
  paths?: string[]
  /**
   * The value of the -p argument to patch, defaults to 1.
   */
  'strip-components'?: number
  /**
   * Whether to use 'git apply' rather than 'patch' to apply the patch, required when the patch file contains binary diffs.
   */
  'use-git'?: boolean
  /**
   * Whether to use 'git am' rather than 'patch' to apply the patch, required when the patch file contains binary diffs. You cannot use this at the same time as use-git.
   */
  'use-git-am'?: boolean
  /**
   * Extra options to pass to the patch command.
   */
  options?: string[]
} & SourcePatch1
export type SourcePatch1 = {
  [k: string]: unknown
}

/**
 * Object specifying the build environment.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "build-options".
 */
export interface BuildOptions {
  /**
   * This is set in the environment variable CFLAGS during the build. Multiple specifications of this (in e.g. per-arch area) are concatenated, separated by spaces.
   */
  cflags?: string
  /**
   * If this is true, clear cflags from previous build options before adding it from these options.
   */
  'cflags-override'?: boolean
  /**
   * This is set in the environment variable CPPFLAGS during the build. Multiple specifications of this (in e.g. per-arch area) are concatenated, separated by spaces.
   */
  cppflags?: string
  /**
   * If this is true, clear cppflags from previous build options before adding it from these options.
   */
  'cppflags-override'?: boolean
  /**
   * This is set in the environment variable CXXFLAGS during the build. Multiple specifications of this (in e.g. per-arch area) are concatenated, separated by spaces.
   */
  cxxflags?: string
  /**
   * If this is true, clear cxxflags from previous build options before adding it from these options.
   */
  'cxxflags-override'?: boolean
  /**
   * This is set in the environment variable LDFLAGS during the build. Multiple specifications of this (in e.g. per-arch area) are concatenated, separated by spaces.
   */
  ldflags?: string
  /**
   * If this is true, clear ldflags from previous build options before adding it from these options.
   */
  'ldflags-override'?: boolean
  /**
   * The build prefix for the modules (defaults to /app for applications and /usr for runtimes).
   */
  prefix?: string
  /**
   * The build libdir for the modules (defaults to /app/lib for applications and /usr/lib for runtimes).
   */
  libdir?: string
  /**
   * This will get appended to PATH in the build environment (with an leading colon if needed).
   */
  'append-path'?: string
  /**
   * This will get prepended to PATH in the build environment (with an trailing colon if needed).
   */
  'prepend-path'?: string
  /**
   * This will get appended to LD_LIBRARY_PATH in the build environment (with an leading colon if needed).
   */
  'append-ld-library-path'?: string
  /**
   * This will get prepended to LD_LIBRARY_PATH in the build environment (with an trailing colon if needed).
   */
  'prepend-ld-library-path'?: string
  /**
   * This will get appended to PKG_CONFIG_PATH in the build environment (with an leading colon if needed).
   */
  'append-pkg-config-path'?: string
  /**
   * This will get prepended to PKG_CONFIG_PATH in the build environment (with an trailing colon if needed).
   */
  'prepend-pkg-config-path'?: string
  /**
   * This is a dictionary defining environment variables to be set during the build. Elements in this override the properties that set the environment, like cflags and ldflags. Keys with a null value unset the corresponding variable.
   */
  env?: {
    /**
     * An environment variable.
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[^=]+$".
     */
    [k: string]: string
  }
  /**
   * This is a array defining which host environment variables is transfered to build-commands or post-install environment.
   */
  'secret-env'?: string[]
  /**
   * This is an array containing extra options to pass to flatpak build.
   */
  'build-args'?: string[]
  /**
   * Similar to build-args but affects the tests, not the normal build.
   */
  'test-args'?: string[]
  /**
   * This is an array containing extra options to pass to configure.
   */
  'config-opts'?: string[]
  /**
   * This is an array of options that will be passed to configure, meant to be used to pass secrets through host environment variables. Put the option with an environment variables and will be resolved beforehand. '-DSECRET_ID=$CI_SECRET'
   */
  'secret-opts'?: string[]
  /**
   * An array of extra arguments that will be passed to make.
   */
  'make-args'?: string[]
  /**
   * An array of extra arguments that will be passed to make install.
   */
  'make-install-args'?: string[]
  /**
   * If this is true (the default is false) then all ELF files will be stripped after install.
   */
  strip?: boolean
  /**
   * By default (if strip is not true) flatpak-builder extracts all debug info in ELF files to a separate files and puts this in an extension. If you want to disable this, set no-debuginfo to true.
   */
  'no-debuginfo'?: boolean
  /**
   * By default when extracting debuginfo we compress the debug sections. If you want to disable this, set no-debuginfo-compression to true.
   */
  'no-debuginfo-compression'?: boolean
  /**
   * This is a dictionary defining for each arch a separate build options object that override the main one.
   */
  arch?: {
    [k: string]: BuildOptions
  }
}
/**
 * Extension define extension points in the app/runtime that can be implemented by extensions, supplying extra files which are available during runtime.
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` ".*".
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "extension".
 */
export interface Extension {
  /**
   * The directory where the extension is mounted. If the extension point is for an application, this path is relative to /app, otherwise it is relative to /usr.
   */
  directory?: string
  /**
   * If this is true, then the data created in the extension directory is omitted from the result, and instead packaged in a separate extension.
   */
  bundle?: boolean
  /**
   * If this is true, the extension is removed when finishing. This is only interesting for extensions in the add-build-extensions property.
   */
  'remove-after-build'?: boolean
  /**
   * Whether to automatically delete extensions matching this extension point when deleting a 'related' application or runtime. Available since 0.6.7.
   */
  autodelete?: boolean
  /**
   * Whether to automatically download extensions matching this extension point when updating or installing a 'related' application or runtime. Available since 0.6.7.
   */
  'no-autodownload'?: boolean
  /**
   * If this key is set to true, then flatpak will look for extensions whose name is a prefix of the extension point name, and mount them at the corresponding name below the subdirectory. Available since 0.1.
   */
  subdirectories?: boolean
  /**
   * A condition that must be true for the extension to be auto-downloaded. As of 1.1.1 this supports multiple conditions separated by semi-colons.
   */
  'add-ld-path'?: string
  /**
   * A condition that must be true for the extension to be auto-downloaded.
   */
  'download-if'?: (
    | ('active-gl-driver' | 'active-gtk-theme' | 'have-intel-gpu')
    | {
        [k: string]: unknown
      }
  ) &
    string
  /**
   * A condition that must be true for the extension to be enabled. As of 1.1.1 this supports multiple conditions separated by semi-colons.
   */
  'enable-if'?: (
    | ('active-gl-driver' | 'active-gtk-theme' | 'have-intel-gpu')
    | {
        [k: string]: unknown
      }
  ) &
    string
  /**
   * A condition that must be false for the extension to be considered unused when pruning. For example, flatpak uninstall --unused uses this information.
   */
  'autoprune-unless'?: (
    | ('active-gl-driver' | 'active-gtk-theme' | 'have-intel-gpu')
    | {
        [k: string]: unknown
      }
  ) &
    string
  /**
   * A list of relative paths of directories below the extension point directory that will be merged. Available since 0.9.1, and backported to the 0.8.x branch in 0.8.3.
   */
  'merge-dirs'?: string
  /**
   * A suffix that gets appended to the directory name. This is very useful when the extension point naming scheme is reversed. For example, an extension point for GTK+ themes would be /usr/share/themes/$NAME/gtk-3.0, which could be achieved using subdirectory-suffix=gtk-3.0. Available since 0.9.1, and backported to the 0.8.x branch in 0.8.3.
   */
  'subdirectory-suffix'?: string
  /**
   * If set, then the extensions are partially downloaded by default, based on the currently configured locales. This means that the extension contents should be a set of directories with the language code as name. Available since 0.9.13 (and 0.6.6 for any extensions called *.Locale)
   */
  'locale-subset'?: boolean
  /**
   * The branch to use when looking for the extension. If this is not specified, it defaults to the branch of the application or runtime that the extension point is for. Available since 0.4.1.
   */
  version?: string
  /**
   * The branches to use when looking for the extension. If this is not specified, it defaults to the branch of the application or runtime that the extension point is for. Available since 0.9.1, and backported to the 0.8.x branch in 0.8.4.
   */
  versions?: string
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "ignored-prop".
 */
export interface IgnoredProp {
  [k: string]: unknown
}
/**
 * Each module specifies a source that has to be separately built and installed. It contains the build options and a list of sources to download and extract before building. Modules can be nested, in order to turn related modules on and off with a single key.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "module".
 */
export interface Module {
  /**
   * The name of the module, used in e.g. build logs. The name is also used for constructing filenames and commandline arguments, therefore using spaces or '/' in this string is a bad idea.
   */
  name: string
  /**
   * If true, skip this module.
   */
  disabled?: boolean
  /**
   * An array of objects defining sources that will be downloaded and extracted in order. String members in the array are interpreted as the name of a separate json or yaml file that contains sources.
   */
  sources?: {
    [k: string]: unknown
  }[]
  /**
   * An array of options that will be passed to configure.
   */
  'config-opts'?: string[]
  /**
   * An array of options that will be passed to configure, meant to be used to pass secrets through host environment variables. Put the option with an environment variables and will be resolved beforehand. '-DSECRET_ID=$CI_SECRET'
   */
  'secret-opts'?: string[]
  /**
   * An array of arguments that will be passed to make.
   */
  'make-args'?: string[]
  /**
   * An array of arguments that will be passed to make install
   */
  'make-install-args'?: string[]
  /**
   * If true, remove the configure script before starting build
   */
  'rm-configure'?: boolean
  /**
   * Ignore the existence of an autogen script.
   */
  'no-autogen'?: boolean
  /**
   * Don't call make with arguments to build in parallel
   */
  'no-parallel-make'?: boolean
  /**
   * Name of the rule passed to make for the install phase, default is install
   */
  'install-rule'?: string
  /**
   * Don't run the make install (or equivalent) stage.
   */
  'no-make-install'?: boolean
  /**
   * Don't fix up the *.py[oc] header timestamps for ostree use.
   */
  'no-python-timestamp-fix'?: boolean
  /**
   * @deprecated
   * Use cmake instead of configure (deprecated: use buildsystem instead).
   */
  cmake?: boolean
  /**
   * Build system to use: autotools, cmake, cmake-ninja, meson, simple, qmake
   */
  buildsystem?:
    | 'autotools'
    | 'cmake'
    | 'cmake-ninja'
    | 'meson'
    | 'simple'
    | 'qmake'
  /**
   * Use a build directory that is separate from the source directory.
   */
  builddir?: boolean
  /**
   * Build inside this subdirectory of the extracted sources.
   */
  subdir?: string
  'build-options'?: BuildOptions
  /**
   * An array of commands to run during build (between make and make install if those are used). This is primarily useful when using the simple buildsystem. Each command is run in /bin/sh -c, so it can use standard POSIX shell syntax such as piping output.
   */
  'build-commands'?: string[]
  /**
   * An array of shell commands that are run after the install phase. Can for example clean up the install dir, or install extra files.
   */
  'post-install'?: string[]
  /**
   * An array of file patterns that should be removed at the end. Patterns starting with / are taken to be full pathnames (without the /app prefix), otherwise they just match the basename. Note that any patterns will only match files installed by this module.
   */
  cleanup?: string[]
  /**
   * The way the builder works is that files in the install directory are hard-links to the cached files, so you're not allowed to modify them in-place. If you list a file in this then the hardlink will be broken and you can modify it. This is a workaround, ideally installing files should replace files, not modify existing ones.
   */
  'ensure-writable'?: string[]
  /**
   * If non-empty, only build the module on the arches listed.
   */
  'only-arches'?: string[]
  /**
   * Don't build on any of the arches listed.
   */
  'skip-arches'?: string[]
  /**
   * Extra files to clean up in the platform.
   */
  'cleanup-platform'?: string[]
  /**
   * If true this will run the tests after installing.
   */
  'run-tests'?: boolean
  /**
   * The target to build when running the tests. Defaults to 'check' for make and 'test' for ninja. Set to empty to disable.
   */
  'test-rule'?: string
  /**
   * Array of commands to run during the tests.
   */
  'test-commands'?: string[]
  /**
   * Array of paths to LICENSE files of the module
   */
  'license-files'?: string[]
  modules?: Modules
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-bzr".
 */
export interface SourceBzr {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * URL of the bzr repository.
   */
  url: string
  /**
   * A specific revision to use in the branch.
   */
  branch?: string
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-svn".
 */
export interface SourceSvn {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * URL of the svn repository, including branch/tag part.
   */
  url: string
  /**
   * A specific revision number to use.
   */
  revision?: string
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-dir".
 */
export interface SourceDir {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The path of a local directory whose content will be copied into the source dir. Note that directory sources don't currently support caching, so they will be rebuilt each time.
   */
  path: string
  /**
   * Source files to ignore in the directory.
   */
  skip?: string[]
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-script".
 */
export interface SourceScript {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * An array of shell commands that will be put in a shellscript file.
   */
  commands: string[]
  /**
   * Filename to use inside the source dir, default to autogen.sh.
   */
  'dest-filename'?: string
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-inline".
 */
export interface SourceInline {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * Filename to use inside the source dir.
   */
  'dest-filename': string
  /**
   * Text data that will be put in the file.
   */
  contents?: string
  /**
   * Whether content is base64-encoded.
   */
  base64?: boolean
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-shell".
 */
export interface SourceShell {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * An array of shell commands that will be run during source extraction.
   */
  commands: string[]
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "source-extra-data".
 */
export interface SourceExtraData {
  /**
   * Type of the source.
   */
  type?:
    | 'archive'
    | 'git'
    | 'bzr'
    | 'svn'
    | 'dir'
    | 'file'
    | 'script'
    | 'inline'
    | 'shell'
    | 'patch'
    | 'extra-data'
  'only-arches'?: OnlyArches
  'skip-arches'?: SkipArches
  /**
   * Directory inside the source dir where this source will be extracted.
   */
  dest?: string
  /**
   * The name to use for the downloaded extra data
   */
  filename: string
  /**
   * The url to the extra data.
   */
  url: string
  /**
   * The sha256 of the extra data.
   */
  sha256: string
  /**
   * The size of the extra data.
   */
  size: number
  /**
   * The extra installed size this adds to the app (optional).
   */
  'installed-size'?: number
}
