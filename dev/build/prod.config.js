var baseConfig = require('./base.config');

module.exports = Object.assign({}, baseConfig, {
	plugins: [
		...baseConfig.plugins,
		new CodeSplitWebpackPlugin(),
	],
});
