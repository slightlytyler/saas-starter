import path from 'path';
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
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
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
}));
