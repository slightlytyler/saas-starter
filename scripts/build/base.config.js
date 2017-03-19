import CopyWebpackPlugin from 'copy-webpack-plugin';
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const __root = path.join(__dirname, '../../');
const __scripts = path.join(__root, 'scripts');
const __dist = path.join(__root, 'dist');
const __src = path.join(__root, 'src');
const __assets = path.join(__src, 'assets');
const __static = path.join(__src, 'static');

export const directories = {
  root: __root,
  scripts: __scripts,
  dist: __dist,
  src: __src,
  assets: __assets,
  static: __static,
};

export default {
  entry: {
    polyfills: ['whatwg-fetch'],
    vendor: [
      'apollo-client',
      'auth0-lock-passwordless',
      'connected-react-router',
      'element-resize-detector',
      'graphql-tag',
      'immutability-helper',
      'jss',
      'jss-preset-default',
      'lodash',
      'material-ui',
      'moment',
      'qs',
      'react',
      'react-apollo',
      'react-async-component',
      'react-dom',
      'react-formal',
      'react-jss',
      'react-layout-components',
      'react-motion',
      'react-redux',
      'react-router-dom',
      'react-tap-event-plugin',
      'recompose',
      'redux',
      'reselect',
      'shortid',
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
          configFile: path.join(directories.scripts, 'lint/dev.js'),
          emitWarning: true,
        },
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['polyfills', 'vendor', 'manifest'],
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
        test: /\.jpg|\.jpeg|\.png$/,
        use: 'url-loader?limit=10000',
        include: directories.assets,
      },
    ],
  },
  resolve: {
    alias: {
      assets: directories.assets,
      common: path.join(directories.src, 'common'),
      modules: path.join(directories.src, 'modules'),
      src: path.join(directories.src),
      styles: path.join(directories.src, 'common/styles'),
    },
  },
};
