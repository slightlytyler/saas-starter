module.exports = {
	extends: ['@saas-starter/eslint-config/base', 'airbnb', 'prettier/react'],
	env: {
		browser: true,
	},
	rules: {
		'arrow-parens': 0,
		'react/jsx-filename-extension': 0,
	},
};
