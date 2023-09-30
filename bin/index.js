#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { getAllVersions, download, install, launch } = require('../lib');
const { getConfig } = require('../lib');

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
        'Donwload Camunda Modeler',
        (yargs) => yargs
            .version(false)
            .option('version', { default: getConfig().getVersion() })
            .option('cache', { boolean: true, default: !getConfig().shouldSkipCache() })
            .option('cache-path', { default: getConfig().getCachePath() }),
        (args) => download({
            version: args.version,
            noCache: !args.cache,
            cachePath: args['cache-path'],
        }).then((res) => process.stdout.write(`Download was finished successfully: ${res}`)),
    )
    .command(
        'install',
        'Install Camunda Modeler',
        (yargs) => yargs
            .version(false)
            .option('version', { default: getConfig().getVersion() })
            .option('path', { default: getConfig().getInstallationPath() })
            .option('overwrite', { boolean: true, default: getConfig().shouldOverwriteExistingInstallation() })
            .option('cache', { boolean: true, default: !getConfig().shouldSkipCache() })
            .option('cache-path', { default: getConfig().getCachePath() })
            .option('link-plugin'),
        (args) => install({
            version: args.version,
            noCache: !args.cache,
            cachePath: args['cache-path'],
            installationPath: args.path,
            overwriteExistingInstallation: args.overwrite,
            linkedPlugins: [args['link-plugin']],
        }).then((res) => process.stdout.write(`Installation was finished successfully: ${res}\n`)),
    )
    .command(
        'launch',
        'Launch Camunda Modeler',
        (yargs) => yargs.option('path', { default: getConfig().getInstallationPath() }),
        args => launch({
            installationPath: args.path,
        }).catch(err => `An error occurred: ${err}`),
    )
    .argv;
