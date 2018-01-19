module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    extends: ['plugin:vue/recommended', 'airbnb-base'],
    plugins: [
        'vue',
    ],
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'webpack/webpack.resolve.conf.js',
            },
        },
    },
    'rules': {
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never',
        }],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state',
                'acc',
                'e',
            ],
        }],
        'vue/html-indent': ['error', 4],
        'indent': ['error', 4],
        'no-shadow': 'off',
    },
};
