const path = require('path');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const rootConfig = require('./webpack.config.root');

const __root = path.join(__dirname, '../../');

const config = merge(rootConfig, {
	name: 'server',
	target: 'node',
	output: {
		path: path.join(__root, 'build/server'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
		publicPath: '/static/',
	},
	externals: [nodeExternals()],
});

module.exports = config;
