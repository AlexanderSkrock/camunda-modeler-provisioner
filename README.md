# camunda-modeler-provisioner
> Setup a Camunda Modeler in any version preconfigured for your needs in no-time!

My vision is to provide an automated way of installation and configuration trough IDE or CLI to help in a multitude of use cases. No matter if you try to reproduce a bug, test your changes to modeler extension this tool should be your choice! 

## Development
Use [npm](https://www.npmjs.com/), the [Node.js](https://nodejs.org/en/) package manager to download and install required dependencies:

```sh
npm install
```

To lint as you code, you can run the following:
```sh
npm run lint-watch
```
The same goes for testing as follows:
```sh
npm run test-watch
```
Currently there is no test infrastructure, neither for the core logic nor for the CLI code. (I know, shame on me :( )

In case you want to try the CLI interface, you can run the following command to link the script:
```sh
npm link
```
To unlink again, simple type:
```sh
npm unlink camunda-modeler-provisioner
```

## Usage
To be written (as binary as well trough code)

## Personal background

I rarely have coherent time slots longer than 10 minutes, so expect many very small commits. Also, I wanted to try out the feature that npm packages can provide binaries and related topics. Thus, especially in the beginning of this project ahead of the first release, there will be a lot back and forth trying to figure out best practises as well as pro and cons for my use case.

## License
MIT ©Alexander Skrock
