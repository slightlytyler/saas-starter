import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge'
import baseConfig, { directories } from './base.config';

const port = 3000;

export default webpackMerge(baseConfig, {
  entry: {
    main: [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(directories.src, 'main.js'),
    ],
  },
  output: {
    filename: '[hash]-[id].[name].bundle.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\./, to: '/' },
      ],
    },
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(directories.src, 'index.ejs'),
      inject: 'body',
      chunksSortMode: 'dependency',
    }),
  ],
  performance: {
    hints: false,
  },
});
