/* eslint-disable no-magic-numbers */

const [range, pkg] = process.argv.slice(2);

if (!['major', 'minor', 'patch'].includes(range)) {
  console.error('Invalid range:', range);
  process.exit(1);
}

const {join} = require('path');
const fs = require('fs');

const pkgDir = join(__dirname, '..', 'packages', pkg);
if (!fs.existsSync(pkgDir) || !fs.statSync(pkgDir).isDirectory()) {
  console.error('Invalid package:', pkg);
  process.exit(1);
}

const {inc, valid: isValidVersion} = require('semver');
const pkgJsonPath = join(pkgDir, 'package.json');
const pkgJson = require(pkgJsonPath);
if (!pkgJson.version || !isValidVersion(pkgJson.version)) {
  console.error('Invalid old package version:', pkgJson.version);
}
pkgJson.version = inc(pkgJson.version, range);
fs.writeFileSync(pkgJsonPath, `${JSON.stringify(pkgJson, null, 2)}\n`);

const {spawnSync} = require('child_process');

const {status, error} = spawnSync('npm', ['publish'], {
  cwd: pkgDir,
  encoding: 'utf8',
  env: process.env,
  stdio: 'inherit'
});

if (status || error) {
  console.error(error || `publish exited with ${status}`);
  process.exit(1);
}
