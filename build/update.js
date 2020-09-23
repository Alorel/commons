/* eslint-disable no-magic-numbers */

let origVersion, pkgJsonPath, pkgJson = null;
(async () => {
  const [range, pkg] = process.argv.slice(2);

  if (!['major', 'minor', 'patch'].includes(range)) {
    throw new Error(`Invalid range: ${range}`);
  }

  const {join, relative} = require('path');
  const fs = require('fs');

  const packagesDir = join(__dirname, '..', 'packages');
  const pkgDir = join(packagesDir, pkg);
  if (!fs.existsSync(pkgDir) || !fs.statSync(pkgDir).isDirectory()) {
    throw new Error(`Invalid package: ${pkg}`);
  }

  const {inc, valid: isValidVersion} = require('semver');
  pkgJsonPath = join(pkgDir, 'package.json');
  pkgJson = require(pkgJsonPath);
  origVersion = pkgJson.version;
  if (!origVersion || !isValidVersion(origVersion)) {
    throw new Error(`Invalid old package version: ${origVersion}`);
  }

  pkgJson.version = inc(origVersion, range);
  fs.writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);

  try {
    fs.rmdirSync(join(__dirname, '..', 'dist'));
  } catch {
    // ach well..
  }

  const {rollup} = require('rollup');
  const configs = require('../rollup.config')({
    dts: true,
    fcjs2015: true,
    fesm2015: true,
    fesm5: true,
    pkgs: pkg
  });

  const builds$ = configs
    .map(async rollupConfig => {
      let label = rollupConfig.input;
      try {
        label = relative(packagesDir, rollupConfig.input);
        console.log('Building', label);
        const build = await rollup(rollupConfig);
        const outputs = rollupConfig.output
          .map(outputConfig => build.write(outputConfig));

        await Promise.all(outputs);
        console.log('Built   ', label);
      } catch (e) {
        console.error('Failed building', label, e);
        throw e;
      }
    });

  await Promise.all(builds$);

  const {spawnSync} = require('child_process');
  const {status, error} = spawnSync('npm', ['publish'], {
    cwd: join(__dirname, '..', 'dist', pkg),
    encoding: 'utf8',
    env: process.env,
    stdio: 'inherit'
  });

  if (error instanceof Error) {
    throw error;
  }

  if (status) {
    throw new Error(`publish exited with ${status}`);
  }
})()
  .catch(e => {
    console.error(e);
    if (origVersion) {
      pkgJson.version = origVersion;
      try {
        require('fs').writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);
      } catch (ee) {
        console.error('Failed ot restore package.json', ee);
      }
    }
    process.exit(1);
  });
