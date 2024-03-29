const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: ['./src/index.js', './src/styles/main.css']
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname + '/public'),
    filename: 'click.js'
  },
  resolve: {
    modulesDirectories: [ 'node_modules' ],
    extensions: [ '', '.js', '.jsx', '.css' ]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss?sourceMap=inline')
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({ 'React': 'react' }),
    new ExtractTextPlugin('click.css')
  ],
  devtool: 'source-map'
};
