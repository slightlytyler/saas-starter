const Module = require('module');
const path = require('path');
const express = require('express');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack/webpack-dev-config');

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 4000;

const app = express();

const devMiddleware = compiler => {
  const fs = new MemoryFS();
  let main;
  compiler.outputFileSystem = fs;
  compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson(webpackConfig.stats);

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString(webpackConfig.stats));

    const mainFilePath = path.join(
      stats.compilation.compiler.outputPath,
      'main.js',
    );
    const mainModule = new Module();
    mainModule.paths = module.paths;
    mainModule._compile(fs.readFileSync(mainFilePath, 'utf8'), mainFilePath);
    main = mainModule.exports.default;
  });
  return (...args) => main(...args);
};

app.use(devMiddleware(webpack(webpackConfig)));

const server = app.listen(PORT, () => {
  console.log(`### Gateway is running at ${HOSTNAME}:${PORT} ###`);
});
