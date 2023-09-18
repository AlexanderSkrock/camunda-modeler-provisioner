[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Static Badge](https://img.shields.io/badge/OS-Windows-green)](https://img.shields.io/badge/OS-Windows-green) ![Static Badge](https://img.shields.io/badge/OS-Linux-gray) ![Static Badge](https://img.shields.io/badge/OS-Mac-red) [![node](https://img.shields.io/node/v/passport.svg)](https://github.com/alexanderskrock/camunda-modeler-provisioner) ![Build](https://github.com/alexanderskrock/camunda-modeler-provisioner/actions/workflows/node.js.yml/badge.svg)
# camunda-modeler-provisioner
> Setup a Camunda Modeler in any version preconfigured for your needs in no-time!

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

## Install

You can install this package as usual:
```sh
npm i -s camunda-modeler-provisioner
```
or respectively
```sh
npm i -sD camunda-modeler-provisioner
```
if you need this as dev dependency only.

## Usage

This package distributes its functionality both as scripts as well js functions. The scripts are linked on running `npm install`, thus you can directly call `camunda-modeler-provisioner` from the CLI.

To display a list of all released versions of the Camunda Modeler use the following:
```sh
camunda-modeler-provisioner versions
```

To download the latest release of the Camunda Modeler use `download`. Optionally you can also specify a version. This command will download to `$HOME/.cache/camunda-modeler` per default. Currently, this can not be changed, but it is planned to change. Also, if a version is already cached, nothing will be downloaded.
```sh
camunda-modeler-provisioner download
```

To install a version of the Camunda Modeler, you can use `install`. This will first download the specified version and then extract the zipped content to the specified directory. Per default this will be `$PWD/.camunda-modeler`. You might want to add this one to your `.gitignore` file.
```sh
camunda-modeler-provisioner install
```
Especially for developing a modeler extension it might be interesting that you can automatically link your extension on installation using the `--link-plugin` flag.
```sh
camunda-modeler install --link-plugin "path.to.plugin"
```

To launch the Camunda Modeler you need a ready Camunda Modeler installation first. Then you can run it with this command. Per default, the default installation directory will be checked, but a another path can be defined as parameter as well.
```sh
camunda-modeler-provisioner launch
```

If you need help or want additional information on usage or parameters you can always use `--help` to display help.

If you would like to integrate any of the provided function you can also require these as mentioned earlier opening the ability to integrate the way you need it.

## Personal background

I rarely have coherent time slots longer than 10 minutes, so expect many very small commits. Also, I wanted to try out the feature that npm packages can provide binaries and related topics. Thus, especially in the beginning of this project ahead of the first release, there will be a lot back and forth trying to figure out best practises as well as pro and cons for my use case.

## License
MIT ©Alexander Skrock
