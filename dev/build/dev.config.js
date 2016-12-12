var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base.config');

var __root = path.join(__dirname, '../../');
var __src = path.join(__root, 'src');

const port = 3000;

module.exports = Object.assign({}, baseConfig, {
  entry: Object.assign({}, baseConfig.entry, {
    main: [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(__src, 'main.js'),
    ],
  }),
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    quiet: false,
    port,
    publicPath: baseConfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },
  plugins: [].concat(baseConfig.plugins, [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]),
});
