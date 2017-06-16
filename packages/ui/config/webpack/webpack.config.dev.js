const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');

const config = [
  {
    name: 'client',
    entry: [
      'webpack-hot-middleware/client',
      path.join(__root, 'src/client.js'),
    ],
    output: {
      filename: 'client.js',
      path: path.join(__root, 'build'),
    },
    target: 'web',
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
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
  },
  {
    name: 'server',
    entry: path.join(__root, 'src/server.js'),
    output: {
      libraryTarget: 'commonjs2',
      filename: 'server.js',
      path: path.join(__root, 'build'),
    },
    target: 'node',
    externals: [nodeExternals({whitelist: 'webpack/hot/poll?1000'})],
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
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
  },
];
module.exports = config;
