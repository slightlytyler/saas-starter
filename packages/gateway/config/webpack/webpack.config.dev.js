const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');

const config = {
  target: 'node',
  devtool: 'eval',
  entry: path.join(__root, 'src/main.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.join(__root, 'build'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    modules: ['node_modules', path.join(__root, 'src')],
  },
  stats: {
    colors: true,
  },
};

module.exports = config;
