#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { join } = require('node:path');

const { getCurrentOS } = require('./process');
const { getAllVersions, download, install, launch } = require('../lib');

// eslint-disable-next-line
yargs(hideBin(process.argv))
    .scriptName('camunda-modeler')
    .command(
        'versions',
        'List available versions of the Camunda Modeler',
        () => {},
        () => getAllVersions().then((versions) => process.stdout.write(`Versions:\n${versions.join('\n')}\n`)),
    )
    .command(
        'download',
        'Donwload Camunda Modler',
        (yargs) => yargs
            .version(false)
            .option('version')
            .option('path', { default: join(process.cwd(), '.camunda-modeler') }),
        (args) => download(getCurrentOS(), args.version, args.path).then((res) => process.stdout.write(`Download was finished successful: ${res}`)),
    )
    .command(
        'install',
        'Install Camunda Modeler',
        (yargs) => yargs
            .version(false)
            .option('version')
            .option('path', { default: join(process.cwd(), '.camunda-modeler') }),
        (args) => install(getCurrentOS(), args.version, args.path).then((res) => process.stdout.write(`Installation was finished successful: ${res}\n`)),
    )
    .command(
        'launch',
        'Launch Camunda Modeler',
        (yargs) => yargs.option('path', { default: join(process.cwd(), '.camunda-modeler') }),
        args => launch(getCurrentOS(), args.path).then(res => process.stdout.write(`Started Camunda Modeler successfully ${res}\n`)).catch(err => `An error occurred: ${err}`),
    )
    .argv;
