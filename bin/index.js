#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { getAllVersions, download, getConfig, install, launch } = require('../lib');
const { error, info } = require('../lib/logging');

// eslint-disable-next-line
yargs(hideBin(process.argv))
    .scriptName('camunda-modeler')
    .command(
        'versions',
        'List available versions of the Camunda Modeler',
        () => {},
        () => getAllVersions()
            .then((versions) => info(versions.join('\n')))
            .catch(err => error(err)),
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
        }).then((res) => info(`Download was finished successfully: ${res}`))
            .catch(err => error(err)),
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
            .option('link-plugin')
            .option('link-template'),
        (args) => install({
            version: args.version,
            noCache: !args.cache,
            cachePath: args['cache-path'],
            installationPath: args.path,
            overwriteExistingInstallation: args.overwrite,
            linkedPlugins: args['link-plugin'] && [args['link-plugin']],
            linkedTemplates: args['link-template'] && [args['link-template']],
        }).then((res) => info(`Installation was finished successfully: ${res}`))
            .catch(err => error(err)),
    )
    .command(
        'launch',
        'Launch Camunda Modeler',
        (yargs) => yargs.option('path', { default: getConfig().getInstallationPath() }),
        args => launch({
            installationPath: args.path,
        }).then(() => info('Camunda Modeler launched successfully'))
            .catch(err => error(err)),
    )
    .argv;
