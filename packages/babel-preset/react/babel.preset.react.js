const presetBase = require('@saas-starter/babel-preset/base');
const presetEnv = require('babel-preset-env').default;
const presetReact = require('babel-preset-react');
const presetStage0 = require('babel-preset-stage-0');
const pluginReactHotLoader = require('react-hot-loader/babel');

const reactPreset = () => ({
  presets: [
    presetBase,
    presetEnv(null, {
      modules: false,
      targets: {
        browsers: ['last 2 versions'],
      },
    }),
    presetReact,
  ],
  env: {
    development: {
      plugins: [pluginReactHotLoader],
    },
  },
});

module.exports = reactPreset;
