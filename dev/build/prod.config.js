var CodeSplitWebpackPlugin = require('code-split-component/webpack');
var baseConfig = require('./base.config');

var __root = path.join(__dirname, '../../');
var __src = path.join(__root, 'src');

module.exports = Object.assign({}, baseConfig, {
  entry: Object.assign({}, baseConfig.entry, {
    main: path.join(__src, 'main.js'),
  }),
	plugins: [
		...baseConfig.plugins,
		new CodeSplitWebpackPlugin(),
	],
});
