import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  performance: {
    hints: "warning",
  },
});
