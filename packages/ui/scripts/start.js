const colors = require('colors/safe');
const Express = require('express');
const path = require('path');
const express = Express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('../config/webpack/webpack.config.dev.js');
  const compiler = webpack(config);
  express.use(webpackDevMiddleware(compiler));
  express.use(
    webpackHotMiddleware(
      compiler.compilers.find(compiler => compiler.name === 'client'),
    ),
  );
  express.use(webpackHotServerMiddleware(compiler));
} else {
  const CLIENT_ASSETS_DIR = path.join(__dirname, '../build/client');
  const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'stats.json');
  const SERVER_RENDERER_PATH = path.join(__dirname, '../build/server.js');
  const serverRenderer = require(SERVER_RENDERER_PATH);
  const stats = require(CLIENT_STATS_PATH);
  express.use(express.static(CLIENT_ASSETS_DIR));
  express.use(serverRenderer(stats));
}

express.listen(80, () => {
  console.log('\n');
  console.log(colors.bold.white(`=== UI running at ${HOST}:${PORT} ===`));
  console.log('\n');
});
