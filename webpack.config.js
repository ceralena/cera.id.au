/* global __dirname, module, process */

const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, 'src', 'cera', 'js');
const builtDir = path.resolve(__dirname, 'static', 'js');

// figure out the env
let env;

if (process.env.NODE_ENV === 'production') {
    env = 'production';
} else {
    env = 'development';
}

const jsLoaders = [
    'babel-loader',
    'eslint-loader'
];

const plugins = [
    new webpack.DllReferencePlugin({
        context: srcDir,
        manifest: require(path.join(builtDir, 'vendors-manifest.json'))
    })
];

if (env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        }
    }));
}

module.exports = {
    devtool: env === 'development' ? 'eval-source-map' : undefined,
    entry: {
        main: path.resolve(srcDir, 'main.js')
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
