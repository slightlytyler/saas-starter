const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.server');

const __root = path.join(__dirname, '../../');

const config = merge(baseConfig, {
	devtool: 'eval',
	entry: [path.join(__root, 'src/main.server.js')],
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
	],
});

module.exports = config;
