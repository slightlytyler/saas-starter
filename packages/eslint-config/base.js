module.exports = {
	parser: 'babel-eslint',
	extends: ['airbnb-base', 'prettier', 'prettier/flowtype'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
	},
};
