const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-es');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const pkg = require('../package.json');

exports.assetsPath = (_path) => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = (options = {}) => {
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    };
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    };

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            });
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
            });
        }
        return ['vue-style-loader'].concat(loaders);
    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    };
};

exports.styleLoaders = (options) => {
    const loaders = exports.cssLoaders(options);

    return Object.values(loaders).map(item => ({
        test: new RegExp(`\\.${item}$`),
        use: item,
    }));
};

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') {
            return;
        }
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: pkg.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png'),
        });
    };
};

exports.loadMinified = (filePath) => {
    const code = fs.readFileSync(filePath, 'utf-8');
    const result = UglifyJS.minify(code);
    if (result.error) return '';
    return result.code;
}
