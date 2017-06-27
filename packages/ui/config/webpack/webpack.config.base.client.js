const path = require('path');
const merge = require('webpack-merge');
const rootConfig = require('./webpack.config.root');

const __root = path.join(__dirname, '../../');

const config = merge(rootConfig, {
	name: 'client',
	target: 'web',
	output: {
		filename: '[name].js',
		path: path.resolve(__root, 'build/client'),
		publicPath: '/static/',
	},
});

module.exports = config;
