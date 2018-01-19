const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const utils = require('./utils');
const config = require('../config');
const env = require('../config/prod.env');
const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true,
        }),
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[hash].js'),
        chunkFilename: utils.assetsPath('js/[id].[hash].js'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env,
        }),
        new UglifyJsPlugin({
            sourceMap: config.build.productionSourceMap,
            parallel: true,
            uglifyOptions: {
                compress: {
                    warnings: false
                },
                ecma: 8
            },
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: false,
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap ? {
                safe: true,
                map: {
                    inline: false,
                },
            } : {
                safe: true,
            },
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
                );
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3,
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*'],
        }]),
        new SWPrecacheWebpackPlugin({
            cacheId: 'demo',
            filename: 'service-worker.js',
            staticFileGlobs: [`${config.build.assetsRoot}/**/*.{js,html,css}`],
            minify: true,
            stripPrefix: `${config.build.assetsRoot}`,
            staticFileGlobsIgnorePatterns: [/\.map$/],
        }),
        new VueSSRClientPlugin(),
    ],
});

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${
            config.build.productionGzipExtensions.join('|')
        })$`),
        threshold: 10240,
        minRatio: 0.8,
    }));
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
