import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
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

export const baseConfig = {
  entry: {
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
      'whatwg-fetch',
      'yup',
    ],
  },
  output: {
    path: __dist,
    publicPath: '/',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: path.join(__dev, 'js-lint/dev.rc'),
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
        `stylint ${path.join(__src, 'common/styles')} --config ${path.join(__dev, 'styl-lint/dev.rc')}`,
      ],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin(
      [{ from: __static, ignore: '.DS_Store' }]
    ),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'eslint-loader',
        include: __src,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: __src,
      },
      {
        test: /\.jpg|\.png$/,
        use: 'url-loader?limit=10000',
        include: __assets,
      },
    ],
  },
  resolve: {
    alias: {
      assets: __assets,
      colors: path.join(__src, 'common/styles/base/colors.js'),
      common: path.join(__src, 'common'),
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
