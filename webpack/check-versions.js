const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');

const packageConfig = require('../package.json');

function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim();
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node,
    },
];

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm,
    });
}

module.exports = () => {
    const warnings = [];
    versionRequirements.forEach((item) => {
        if (!semver.satisfies(item.currentVersion, item.versionRequirement)) {
            warnings.push(`${item.name}: ${
                chalk.red(item.currentVersion)} should be ${
                chalk.green(item.versionRequirement)}`, );
        }
    });

    if (warnings.length) {
        console.log(chalk.yellow('To use this template, you must update following to modules:'));
        warnings.forEach((item) => {
            console.log(`  ${item}`);
        });
        console.log();
        process.exit(1);
    }
};
