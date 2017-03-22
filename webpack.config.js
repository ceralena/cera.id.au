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
    new webpack.ProvidePlugin({
        'React': 'react'
    }),
    new ExtractTextPlugin({
        filename: function (getPath) {
            return getPath('/../css/cera.css');
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

    plugins.push(new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify('production')}
    }));
} else {
    plugins.push(new webpack.DllReferencePlugin({
        context: srcDir,
        manifest: require(path.join(builtDir, 'vendors-manifest.json'))
    }));
    jsLoaders.push('eslint-loader');
}

module.exports = {
    devtool: env === 'development' ? 'source-map' : undefined,
    entry: {
        main: [
            path.join(srcDir, 'main.js'),
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
