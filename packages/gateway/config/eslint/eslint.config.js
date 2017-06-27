const path = require('path');

const __root = path.join(__dirname, '../../');

module.exports = {
  extends: '@saas-starter/eslint-config/graphql',
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__root, 'config/webpack/webpack.config.dev.js'),
      },
    },
  },
};
