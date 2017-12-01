const API_ROOT = {
    daily: 'http://daily',
    gray: 'http://gray',
    master: 'http://www',
};

const buildType = JSON.parse(process.env.npm_config_argv)['remain'][0] || 'daily';

module.exports = {
    NODE_ENV: '"production"',
    API_ROOT: `"${API_ROOT[buildType]}"`,
};
