#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { getCurrentOS } = require('./process');
const { getAllVersions, download, install } = require('../lib');

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
        (yargs) => yargs.version(false).option('version'),
        (args) => download(getCurrentOS(), args.version).then((res) => process.stdout.write(`Download was finished successful: ${res}`)),
    )
    .command(
        'install',
        'Install Camunda Modeler',
        (yargs) => yargs.version(false).option('version'),
        (args) => install(getCurrentOS(), args.version).then((res) => process.stdout.write(`Installation was finished successful: ${res}\n`)),
    )
    .argv;
