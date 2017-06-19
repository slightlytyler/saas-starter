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
const app = express();

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers[0];

  app.use(webpackDevMiddleware(multiCompiler, {publicPath}));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(
    // keeps serverRender updated with arg: { clientStats, outputPath }
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: {outputPath},
    }),
  );
} else {
  const clientStats = require('../build/client/stats.json');
  const serverRender = require('../build/server/main.js').default;

  app.use(publicPath, app.static(outputPath));
  app.use(serverRender({clientStats, outputPath}));
}

app.listen(3000, () => {
  console.log('\n');
  console.log(colors.bold.white(`=== UI running at ${HOST}:${PORT} ===`));
  console.log('\n');
});
