module.exports = {
	parser: 'babel-eslint',
	extends: ['plugin:lodash-fp/recommended', 'prettier', 'prettier/flowtype'],
	plugins: ['lodash-fp', 'prettier'],
	rules: {
		'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
	},
};
