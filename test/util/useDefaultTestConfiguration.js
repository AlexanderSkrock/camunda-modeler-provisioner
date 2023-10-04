const { mkdtemp, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { sep } = require('node:path');

const useContextHooks = require("./useContextHooks");
const { Config } = require("../../lib/config");

function useDefaultTestConfiguration(testContext) {
  const { afterEach, beforeEach } = useContextHooks(testContext);

  const config = new Config();
  beforeEach(async () => {
    config.cachePath = await mkdtemp(`${tmpdir()}${sep}`);
    config.installationPath = await mkdtemp(`${tmpdir()}${sep}`);
  });
  afterEach(async () => {
    rm(config.getCachePath(), { recursive: true, force: true });
    rm(config.getInstallationPath(), { recursive: true, force: true });
  });

  return config;
}

module.exports = useDefaultTestConfiguration;