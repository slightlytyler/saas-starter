import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __root = path.join(__dirname, '../../');
const __dev = path.join(__root, 'dev');
const __dist = path.join(__root, 'dist');
const __src = path.join(__root, 'src');

export const baseConfig = {
  entry: {
    vendor: [
      'code-split-component',
      'lodash',
      'react', 
      'react-dom',
      'react-redux', 
      'react-router',
      'redux'
    ],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dist,
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new HtmlWebpackPlugin({
      template: path.join(__src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        query: {
          configFile: path.join(__dev, 'lint/dev.rc'),
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      common: path.join(__src, 'common'),
      modules: path.join(__src, 'modules'),
    },
  },
};

export const createConfig = selector => selector({ 
  __root,
  __dev,
  __dist,
  __src,
  baseConfig,
});
