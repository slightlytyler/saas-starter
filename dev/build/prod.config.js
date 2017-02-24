import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge'
import baseConfig, { directories } from './base.config';

export default webpackMerge(baseConfig, {
  entry: {
    main: [
      path.join(directories.src, 'main.js'),
    ],
  },
  output: {
    filename: '[chunkhash].[name].bundle.js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(directories.src, 'index.ejs'),
      filename: '200.html',
      inject: 'body',
      chunksSortMode: 'dependency',
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
  performance: {
    hints: "warning",
  },
});
