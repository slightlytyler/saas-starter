const presetBase = require('@saas-starter/babel-preset/base');
const presetEnv = require('babel-preset-env').default;
const presetStage0 = require('babel-preset-stage-0');

const nodePreset = () => ({
  presets: [
    presetBase,
    presetEnv(null, {
      modules: false,
      targets: {
        node: 'current',
      },
    }),
  ],
});

module.exports = nodePreset;
