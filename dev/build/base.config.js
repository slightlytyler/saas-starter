import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import WebpackShellPlugin from 'webpack-shell-plugin';
import yargs from 'yargs';

const __root = path.join(__dirname, '../../');
const __dev = path.join(__root, 'dev');
const __dist = path.join(__root, 'dist');
const __src = path.join(__root, 'src');
const __assets = path.join(__src, 'assets');
const __static = path.join(__src, 'static');

export const directories = {
  root: __root,
  dev: __dev,
  dist: __dist,
  src: __src,
  assets: __assets,
  static: __static,
};

export default {
  entry: {
    polyfills: ['whatwg-fetch'],
    vendor: [
      'connected-react-router',
      'lodash',
      'material-ui',
      'qs',
      'react',
      'react-dom',
      'react-formal',
      'react-layout-components',
      'react-redux',
      'react-router-dom',
      'react-tap-event-plugin',
      'redux',
      'redux-saga',
      'redux-storage',
      'redux-storage-decorator-filter',
      'redux-storage-engine-localstorage',
      'yup',
    ],
  },
  output: {
    path: directories.dist,
    publicPath: '/',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(directories.dev, 'js-lint/dev.js'),
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version'],
          }),
        ],
      },
    }),
    new WebpackShellPlugin({
      onBuildExit: [
        `stylint ${path.join(directories.src, 'common/styles')} --config ${path.join(directories.dev, 'styl-lint/dev.rc')}`,
      ],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfills', 'vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(directories.src, 'index.ejs'),
      inject: 'body',
      chunksSortMode: 'dependency',
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
    }),
    new CopyWebpackPlugin(
      [{ from: directories.static, ignore: '.DS_Store' }]
    ),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
        include: directories.src,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: directories.src,
      },
      {
        test: /\.jpg|\.png$/,
        use: 'url-loader?limit=10000',
        include: directories.assets,
      },
    ],
  },
  resolve: {
    alias: {
      assets: directories.assets,
      colors: path.join(directories.src, 'common/styles/base/colors.js'),
      common: path.join(directories.src, 'common'),
      modules: path.join(directories.src, 'modules'),
      src: path.join(directories.src),
    },
  },
};
