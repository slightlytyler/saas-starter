import path from 'path';
import webpack from 'webpack';
import { createConfig } from './base.config';

const port = 3000;

export default createConfig(({ __src, baseConfig }) => ({
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    main: [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(__src, 'main.js'),
    ],
  },
  output: {
    ...baseConfig.output,
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
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
    ],
  },
  performance: {
    hints: false,
  },
}))
