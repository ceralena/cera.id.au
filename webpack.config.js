const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],

  entry: {
    app: path.resolve('src', 'js', 'app.js'),
  },

  output: {
    path: path.resolve('static', 'assets'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};
