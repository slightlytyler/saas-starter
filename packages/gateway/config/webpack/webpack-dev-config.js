const path = require('path');
const nodeExternals = require('webpack-node-externals');

const __root = path.join(__dirname, '../../');

const config = {
  entry: {
    main: path.join(__root, 'src/main.js'),
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.join(__root, 'dist'),
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        include: path.join(__root, 'src'),
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
};

module.exports = config;
