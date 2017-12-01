const path = require('path');
const merge = require('webpack-merge');

const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const resolveWebpackConfig = require('./webpack.resolve.conf');

const isPro = process.env.NODE_ENV === 'production';
// 获得打包类型 默认daily
const buildType = JSON.parse(process.env.npm_config_argv)['remain'][0] || 'daily';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = merge(resolveWebpackConfig, {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: isPro ? config.build.assetsPublicPath[buildType] : config.dev.assetsPublicPath,
    },
    module: {
        rules: [
            ...((isPro && config.dev.useEslint) ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: resolve('src'),
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: !config.dev.showEslintErrorsInOverlay,
                },
            }] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve('src'),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
        ],
    },
});
