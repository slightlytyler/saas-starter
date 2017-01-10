import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import yargs from 'yargs';

const __root = path.join(__dirname, '../../');
const __dev = path.join(__root, 'dev');
const __dist = path.join(__root, 'dist');
const __src = path.join(__root, 'src');
const __assets = path.join(__src, 'assets');

const env = process.env.NODE_ENV || 'development_local';
const globals = {
  __NODE_ENV__: JSON.stringify(env),
  __LOCAL_DEV__: env === 'development_local',
  __REMOTE_DEV__: env === 'development_remote',
  __PROD__: env === 'production',
  __TEST__: env === 'test',
  __DEBUG__: env === 'development' && !yargs.argv.no_debug,
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
};

export const baseConfig = {
  entry: {
    vendor: [
      'code-split-component',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dist,
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin(globals),
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
      {
        test: /\.jpg|\.png$/,
        loader: 'url-loader',
        include: __assets,
      },
    ],
  },
  resolve: {
    alias: {
      assets: __assets,
      common: path.join(__src, 'common'),
      components: path.join(__src, 'components'),
      modules: path.join(__src, 'modules'),
      src: path.join(__src),
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
