const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');

const config = {
  entry: {
    server: ['webpack/hot/poll?1000', path.join(__root, 'src/server.js')],
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.join(__root, 'dist'),
  },
  target: 'node',
  externals: [nodeExternals({whitelist: 'webpack/hot/poll?1000'})],
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new StartServerPlugin('server.js'),
  ],
  module: {
    rules: [
      {
        include: path.join(__root, 'src'),
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.join(__root, 'src')],
  },
  stats: {
    colors: true,
  },
};

module.exports = config;
