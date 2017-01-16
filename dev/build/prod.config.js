import path from 'path';
import CodeSplitWebpackPlugin from 'code-split-component/webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { createConfig } from './base.config';

export default createConfig(({ __src, baseConfig }) => ({
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    main: [
      path.join(__src, 'main.js'),
    ],
  },
  output: {
    ...baseConfig.output,
    filename: '[chunkhash].[name].bundle.js',
  },
  plugins: [
    ...baseConfig.plugins,
    new CodeSplitWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
  ],
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!stylus-relative-loader?resolve url',
        }),
      },
    ],
  },
  performance: {
    hints: "warning",
  },
}));
