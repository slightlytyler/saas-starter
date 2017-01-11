import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
      'material-ui',
      'qs',
      'react',
      'react-dom',
      'react-formal',
      'react-layout-components',
      'react-redux',
      'react-router',
      'react-tap-event-plugin',
      'redux',
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
        `stylint ${path.join(__src, 'styles')} --config ${path.join(__dev, 'styl-lint/dev.rc')}`,
      ],
    }),
    new webpack.DefinePlugin(globals),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true,
    }),
    new CopyWebpackPlugin(
      [{ from: __static, ignore: '.DS_Store' }]
    ),
  ],
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!postcss-loader!stylus-relative-loader?resolve url',
        }),
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
      colors: path.join(__src, 'styles/base/colors.js'),
      common: path.join(__src, 'common'),
      components: path.join(__src, 'components'),
      modules: path.join(__src, 'modules'),
      src: path.join(__src),
      styles: path.join(__src, 'styles'),
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
