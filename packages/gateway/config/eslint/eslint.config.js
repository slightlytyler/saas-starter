const path = require('path');
const __root = path.join(__dirname, '../../');

module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'prettier', 'prettier/flowtype'],
	env: {
		node: true,
	},
	rules: {},
	settings: {
		'import/resolver': {
			webpack: {
				config: path.join(__root, 'config/webpack/webpack.config.dev.js'),
			},
		},
	},
};
