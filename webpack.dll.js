/* global __dirname, module */
const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src', 'cera', 'js');
const builtDir = path.resolve(__dirname, 'static', 'js');

const env = process.env.NODE_ENV || 'development';

const plugins = [
    new webpack.DllPlugin({
        path: path.join(builtDir, '[name]-manifest.json'),
        name: '[name]',
        context: srcDir
    })
];

if (env === 'production') {
    plugins.append(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            output: {
                comments: false
            }
        })
    );
}

module.exports = {
    entry: {
        vendors: [path.join(srcDir, 'vendors.js')]
    },

    output: {
        path: builtDir,
        filename: '[name].js',
        library: '[name]'
    },

    plugins: plugins
};
