const path = require('path');
const __root = path.join(__dirname, '../../');

module.exports = {
	parser: 'babel-eslint',
	extends: require('shared/eslint/eslint.config.base.js').default,
	env: {
		node: true,
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: path.join(__root, 'config/webpack/webpack.config.dev.js'),
			},
		},
	},
};
