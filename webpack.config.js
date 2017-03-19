/* global __dirname, module, process */

const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src', 'cera', 'js');
const builtDir = path.resolve(__dirname, 'static', 'js');

const env = process.env.NODE_ENV || 'development';

const jsLoaders = [
    'babel-loader'
];

const plugins = [
    new webpack.DllReferencePlugin({
        context: srcDir,
        manifest: require(path.join(builtDir, 'vendors-manifest.json'))
    }),
    new webpack.ProvidePlugin({
        'React': 'react'
    })
];

if (env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        },
        output: {
            comments: false
        }
    }));
} else {
    jsLoaders.push('eslint-loader');
}

module.exports = {
    devtool: env === 'development' ? 'source-map' : undefined,
    entry: {
        main: path.join(srcDir, 'main.js')
    },

    output: {
        filename: '[name].js',
        path: builtDir,
        library: '[name]',
        libraryTarget: 'var'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: jsLoaders
            }
        ]
    },

    plugins: plugins

};
