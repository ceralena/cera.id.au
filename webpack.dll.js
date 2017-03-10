/* global __dirname, module */
const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src', 'cera', 'js');
const builtDir = path.resolve(__dirname, 'static', 'js');

module.exports = {
    entry: {
        vendors: [path.join(srcDir, 'vendors.js')]
    },

    output: {
        path: builtDir,
        filename: '[name].js',
        library: '[name]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(builtDir, '[name]-manifest.json'),
            name: '[name]',
            context: srcDir
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            }
        })
    ]
};
