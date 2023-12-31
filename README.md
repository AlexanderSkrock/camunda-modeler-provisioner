[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![node](https://img.shields.io/node/v/passport.svg)](https://github.com/alexanderskrock/camunda-modeler-provisioner) ![Build](https://github.com/alexanderskrock/camunda-modeler-provisioner/actions/workflows/windows-ci.yml/badge.svg) ![Build](https://github.com/alexanderskrock/camunda-modeler-provisioner/actions/workflows/linux-ci.yml/badge.svg) ![Build](https://github.com/alexanderskrock/camunda-modeler-provisioner/actions/workflows/mac-ci.yml/badge.svg)

# camunda-modeler-provisioner
> Set up a Camunda Modeler in any version preconfigured for your needs in no-time!

My vision is to provide an automated way of installation and configuration trough IDE or CLI to help in a multitude of use cases. No matter if you try to reproduce a bug, test your changes to a modeler extension, test your changes to element templates or modify bpmn files in your current project this tool should be your choice! 

## Development
Use [npm](https://www.npmjs.com/), the [Node.js](https://nodejs.org/en/) package manager to download and install required dependencies:

```sh
npm install
```

To lint as you code, you can run the following:
```sh
npm run lint-watch
```
The same goes for testing:
```sh
npm run test-watch
```

In case you want to try the CLI interface, you can run the following command to link the script:
```sh
npm link
```
To unlink again, simple type:
```sh
npm unlink camunda-modeler-provisioner
```

## Installation

This package distributes its functionality both as scripts as well js functions. The scripts can directly be used via `npx` or `npm exec` without explicitly adding the dependency:
```sh
npx camunda-modeler-provisioner
```
Alternatively you can install this package as usual:
```sh
npm i -s camunda-modeler-provisioner
```
or respectively
```sh
npm i -sD camunda-modeler-provisioner
```
if you need this as dev dependency only.

Explicitly installing can be charming in combination with some IDEs that automatically add the linked node binaries to the path variable. Then, you can call the script directly:
```sh
camunda-modeler-provisioner
```

## Usage

To display a list of all released versions of the Camunda Modeler use the following:
```sh
npx camunda-modeler-provisioner versions
```

To download the latest release of the Camunda Modeler use `download`. Optionally you can also specify a version. This command will download to `$HOME/.cache/camunda-modeler` per default. Currently, this can not be changed, but it is planned to change. Also, if a version is already cached, nothing will be downloaded.
```sh
npx camunda-modeler-provisioner download
```

To install a version of the Camunda Modeler, you can use `install`. This will first download the specified version and then extract the zipped content to the specified directory. Per default this will be `$PWD/.camunda-modeler`. You might want to add this one to your `.gitignore` file.
```sh
npx camunda-modeler-provisioner install
```
Especially for developing a modeler extension it might be interesting that you can automatically link your extension on installation using the `--link-plugin` flag.
```sh
npx camunda-modeler install --link-plugin "path.to.plugin"
```

To launch the Camunda Modeler you need a ready Camunda Modeler installation first. Then you can run it with this command. Per default, the default installation directory will be checked, but another path can be defined as parameter as well.
```sh
npx camunda-modeler-provisioner launch
```

If you need help or want additional information on usage or parameters you can always use `--help` to display help.

If you would like to integrate any of the provided function you can also require these as mentioned earlier opening the ability to integrate the way you need it.

## Configuration

While passing parameters both via CLI or JS API is possible, you can also define the configuration within files in case that better suits your needs.

* .camunda-modeler.cjs
* .camunda-modeler.js
* .camunda-modeler (YAML/JSON)
* .camunda-modeler.json
* .camunda-modeler.yaml
* camunda-modeler.config.js
* camunda-modeler.config.cjs

The Camunda Modeler provisioner will also read a `camunda-modeler` key from your application's package.json

The following parameters are available:

| CLI parameter        | Config file parameter         | Default                      | Description                                                                                                                                                                                                                                                           |
| -------------------- | ----------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <i>not available</i> | platform                      | Process platform             | Platform of the Camunda Modeler<br/>This option determines what artifact and binary file to use                                                                                                                                                                       |
| version              | version                       | Latest                       | Version the Camunda Modeler                                                                                                                                                                                                                                           |
| no-cache             | noCache                       | false                        | This option forces to download the specified version regardless whether it is in cache. The downloaded data will be stored into cache.                                                                                                                                |
| cache-path           | cachePath                     | $HOME/.cache/camunda-modeler | In this directory all downloaded artifacts will be cached. Will be created if it does not exists.                                                                                                                                                                     |
| path                 | installationPath              | $PWD/camunda-modeler         | This path will be used to install the Camunda Modeler. Also this directoy will be queried when attempting to launch an installed instance.                                                                                                                            |
| overwrite            | overwriteExistingInstallation | false                        | Before starting the installation the target directory will be checked wether it is empty. If it is empty, everything is fine. Otherwise, the behaviour dependes on this flag. Per default the process will abort, but it can be enabled to clear the directory first. |
| link-plugin          | linkedPlugins                 | None                         | This option enables to link a plugin or extension dynamically to the installed Camunda Modeler instance.                                                                                                                                                              |
| link-template        | linkedTemplates               | None                         | This option enables to link an element template dynamically to the installed Camunda Modeler.                                                         |

An example configuration in a json format could be as follows:

```json
{
  "version": "v5.15.0",
  "installationPath": "./camunda-modeler",
  "linkedPlugins": ["."]
}
```

This configuration would install a Camunda Modeler with version `v5.15.0` in a subfolder of your current directory called `.camunda-modeler`. Additionally, the current directory will be linked as plugin into this Camunda Modeler instance. This could be the case, when you develop an extension.

## Personal background

I rarely have coherent time slots longer than 10 minutes, so expect many very small commits. Also, I wanted to try out the feature that npm packages can provide binaries and related topics. Thus, especially in the beginning of this project ahead of the first release, there will be a lot back and forth trying to figure out best practises as well as pro and cons for my use case.

## License
MIT ©Alexander Skrock
