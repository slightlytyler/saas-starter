const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.client');

const __root = path.join(__dirname, '../../');

const config = merge(baseConfig, {
	devtool: 'eval',
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
		'react-hot-loader/patch',
		path.resolve(__root, 'src/main.client.js'),
	],
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
			filename: '[name].js',
			minChunks: Infinity,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
			},
		}),
	],
});

module.exports = config;
