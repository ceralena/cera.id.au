const path = require('path');

module.exports = {
  entry: {
    app: path.resolve('src', 'js', 'app.js'),
    style: path.resolve('src', 'js', 'style.js')
  },
  output: {
    path: path.resolve('static', 'assets'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
