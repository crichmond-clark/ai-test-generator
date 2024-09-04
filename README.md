ai-auto-testgen
=================

A new CLI generated with oclif


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/ai-auto-testgen.svg)](https://npmjs.org/package/ai-auto-testgen)
[![Downloads/week](https://img.shields.io/npm/dw/ai-auto-testgen.svg)](https://npmjs.org/package/ai-auto-testgen)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ai-auto-testgen
$ ai-auto-testgen COMMAND
running command...
$ ai-auto-testgen (--version)
ai-auto-testgen/0.0.0 linux-x64 node-v20.17.0
$ ai-auto-testgen --help [COMMAND]
USAGE
  $ ai-auto-testgen COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ai-auto-testgen hello PERSON`](#ai-auto-testgen-hello-person)
* [`ai-auto-testgen hello world`](#ai-auto-testgen-hello-world)
* [`ai-auto-testgen help [COMMAND]`](#ai-auto-testgen-help-command)
* [`ai-auto-testgen plugins`](#ai-auto-testgen-plugins)
* [`ai-auto-testgen plugins add PLUGIN`](#ai-auto-testgen-plugins-add-plugin)
* [`ai-auto-testgen plugins:inspect PLUGIN...`](#ai-auto-testgen-pluginsinspect-plugin)
* [`ai-auto-testgen plugins install PLUGIN`](#ai-auto-testgen-plugins-install-plugin)
* [`ai-auto-testgen plugins link PATH`](#ai-auto-testgen-plugins-link-path)
* [`ai-auto-testgen plugins remove [PLUGIN]`](#ai-auto-testgen-plugins-remove-plugin)
* [`ai-auto-testgen plugins reset`](#ai-auto-testgen-plugins-reset)
* [`ai-auto-testgen plugins uninstall [PLUGIN]`](#ai-auto-testgen-plugins-uninstall-plugin)
* [`ai-auto-testgen plugins unlink [PLUGIN]`](#ai-auto-testgen-plugins-unlink-plugin)
* [`ai-auto-testgen plugins update`](#ai-auto-testgen-plugins-update)

## `ai-auto-testgen hello PERSON`

Say hello

```
USAGE
  $ ai-auto-testgen hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ ai-auto-testgen hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/uni/ai-auto-testgen/blob/v0.0.0/src/commands/hello/index.ts)_

## `ai-auto-testgen hello world`

Say hello world

```
USAGE
  $ ai-auto-testgen hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ ai-auto-testgen hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/uni/ai-auto-testgen/blob/v0.0.0/src/commands/hello/world.ts)_

## `ai-auto-testgen help [COMMAND]`

Display help for ai-auto-testgen.

```
USAGE
  $ ai-auto-testgen help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ai-auto-testgen.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.10/src/commands/help.ts)_

## `ai-auto-testgen plugins`

List installed plugins.

```
USAGE
  $ ai-auto-testgen plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ai-auto-testgen plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/index.ts)_

## `ai-auto-testgen plugins add PLUGIN`

Installs a plugin into ai-auto-testgen.

```
USAGE
  $ ai-auto-testgen plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into ai-auto-testgen.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the AI_AUTO_TESTGEN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AI_AUTO_TESTGEN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ ai-auto-testgen plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ ai-auto-testgen plugins add myplugin

  Install a plugin from a github url.

    $ ai-auto-testgen plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ ai-auto-testgen plugins add someuser/someplugin
```

## `ai-auto-testgen plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ai-auto-testgen plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ai-auto-testgen plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/inspect.ts)_

## `ai-auto-testgen plugins install PLUGIN`

Installs a plugin into ai-auto-testgen.

```
USAGE
  $ ai-auto-testgen plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into ai-auto-testgen.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the AI_AUTO_TESTGEN_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the AI_AUTO_TESTGEN_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ ai-auto-testgen plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ ai-auto-testgen plugins install myplugin

  Install a plugin from a github url.

    $ ai-auto-testgen plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ ai-auto-testgen plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/install.ts)_

## `ai-auto-testgen plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ ai-auto-testgen plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ ai-auto-testgen plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/link.ts)_

## `ai-auto-testgen plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ai-auto-testgen plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ai-auto-testgen plugins unlink
  $ ai-auto-testgen plugins remove

EXAMPLES
  $ ai-auto-testgen plugins remove myplugin
```

## `ai-auto-testgen plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ ai-auto-testgen plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/reset.ts)_

## `ai-auto-testgen plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ai-auto-testgen plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ai-auto-testgen plugins unlink
  $ ai-auto-testgen plugins remove

EXAMPLES
  $ ai-auto-testgen plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/uninstall.ts)_

## `ai-auto-testgen plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ ai-auto-testgen plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ai-auto-testgen plugins unlink
  $ ai-auto-testgen plugins remove

EXAMPLES
  $ ai-auto-testgen plugins unlink myplugin
```

## `ai-auto-testgen plugins update`

Update installed plugins.

```
USAGE
  $ ai-auto-testgen plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.6/src/commands/plugins/update.ts)_
<!-- commandsstop -->
