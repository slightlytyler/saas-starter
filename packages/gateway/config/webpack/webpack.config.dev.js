const path = require('path');
const flowBin = require('flow-bin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
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
    new FlowStatusWebpackPlugin({
      binaryPath: flowBin,
      onError: stdout => console.log(stdout),
      onSuccess: stdout => console.log(stdout),
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
