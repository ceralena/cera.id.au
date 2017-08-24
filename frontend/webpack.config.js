/* global __dirname, module, process, require */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src');
const builtDir = path.resolve(__dirname, 'static', 'js');

const env = process.env.NODE_ENV || 'development';

const jsLoaders = [
    'babel-loader'
];

const plugins = [
    new ExtractTextPlugin({
        filename: function (getPath) {
            return getPath('/../css/cera.css');
        }
    }),
    new webpack.DefinePlugin({
        ENV: JSON.stringify(env),
        'process.env': {
            'NODE_ENV': JSON.stringify(env)
        }
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

    plugins.push(new OptimizeCssAssetsPlugin({
        assetNameRegexp: /\.css$/,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: {removeAll: true }},
        canPrint: true
    }));
}

module.exports = {
    devtool: env === 'development' ? 'source-map' : undefined,
    entry: {
        'console-main': [
            path.join(srcDir, 'console-main.js'),
            path.join(srcDir, 'css', 'cera.css')
        ]
    },

    output: {
        filename: '[name].js',
        path: builtDir
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: jsLoaders
            },
            {
                test: /\.css$/,
                loaders: ExtractTextPlugin.extract(
                    {fallback: 'style-loader', use: 'css-loader'})
            }
        ]
    },

    plugins: plugins

};
