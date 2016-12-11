var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CodeSplitWebpackPlugin = require('code-split-component/webpack');

var __root = path.join(__dirname, '../../');
var __dev = path.join(__root, 'dev');
var __dist = path.join(__root, 'dist');
var __src = path.join(__root, 'src');

module.exports = {
  entry: {
    vendor: [
      'react', 
      'react-dom',
      'redux', 
      'react-redux', 
      'react-router',
      'code-split-component',
    ],
    main: path.join(__src, 'main.js'),
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dist,
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
  	new HtmlWebpackPlugin({
      template: path.join(__src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      common: path.join(__src, 'common'),
    },
  },
};
