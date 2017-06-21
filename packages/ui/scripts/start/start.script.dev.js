const path = require('path');
const colors = require('colors/safe');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware-multi-compiler');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const {
  clientConfig,
  serverConfig,
} = require('../../config/webpack/webpack.config.dev');

const {HOST, NODE_ENV, PORT} = process.env;
const DEV = NODE_ENV === 'development';
const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const server = express();

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  server.use(webpackDevMiddleware(multiCompiler, {publicPath}));
  server.use(webpackHotMiddleware(clientCompiler));
  server.use(webpackHotServerMiddleware(multiCompiler));
} else {
  const clientStats = require(path.join(outputPath, 'client/stats.json'));
  const renderServer = require(path.join(outputPath, 'server/main.js'));

  server.use(publicPath, server.static(outputPath));
  server.use(renderServer({clientStats}));
}

server.listen(80, () => {
  console.log('\n');
  console.log(colors.bold.white(`=== UI running at ${HOST}:${PORT} ===`));
  console.log('\n');
});
