const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.conf.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const utils = require('./utils');

const serverConfig = merge(baseConfig, {
    target: 'node',
    devtool: 'source-map',
    entry: './src/entry-server.js',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: false,
        }),
        new VueSSRServerPlugin()
    ]
});

module.exports = serverConfig;
