module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:lodash-fp/recommended',
  ],
  plugins: [
    'class-property',
    'graphql',
    'lodash-fp',
  ],
  env: {
    browser: true,
  },
  globals: {
    '__DEV__': false,
  },
  rules: {
    'arrow-parens': 'off',
    'class-property/class-property-semicolon': 2,
    'graphql/template-strings': ['error', {
      env: 'apollo',
      schemaJson: require('../../schema.json'),
    }],
    'import/extensions': 'off',
    'import/imports-first': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-sort-props': 2,
    'react/jsx-wrap-multilines': 2,
    'react/no-unused-prop-types': [2, { skipShapeProps: true }],
    'react/jsx-pascal-case': 2,
    'react/prefer-stateless-function': 'off',
    'react/sort-prop-types': 2,
  },
};
