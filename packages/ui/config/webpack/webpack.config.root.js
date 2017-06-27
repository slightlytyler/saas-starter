const path = require('path');
const flowBin = require('flow-bin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

const __root = path.join(__dirname, '../../');

const config = {
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					configFile: path.join(__root, 'config/eslint/eslint.config.js'),
					emitWarning: true,
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
		],
	},
	plugins: [
		new FlowStatusWebpackPlugin({
			binaryPath: flowBin,
			onError: stdout => console.log(stdout),
			onSuccess: stdout => console.log(stdout),
		}),
	],
	resolve: {
		modules: ['node_modules', path.join(__root, 'src')],
	},
	stats: {
		colors: true,
	},
};

module.exports = config;
