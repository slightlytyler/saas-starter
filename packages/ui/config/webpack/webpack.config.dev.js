const path = require('path');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');

const clientConfig = {
  name: 'client',
  target: 'web',
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__root, 'src/main.client.js'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__root, 'build/client'),
    publicPath: '/static/',
  },
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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

const serverConfig = {
  name: 'server',
  target: 'node',
  devtool: 'eval',
  entry: [path.join(__root, 'src/main.server.js')],
  output: {
    path: path.join(__root, 'build/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    modules: ['node_modules', path.join(__root, 'src')],
  },
  stats: {
    colors: true,
  },
};

module.exports = {
  clientConfig,
  serverConfig,
};
