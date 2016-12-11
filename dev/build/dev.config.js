var baseConfig = require('./base.config');

module.exports = Object.assign({}, baseConfig, {
	devServer:{
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
  },
});
