const pluginFlowRuntime = require('babel-plugin-flow-runtime').default;
const pluginTransformFlowStripTypes = require('babel-plugin-transform-flow-strip-types');
const presetStage0 = require('babel-preset-stage-0');

const basePreset = {
  presets: [presetStage0],
  env: {
    development: {
      plugins: [
        pluginFlowRuntime(null, {
          annotate: true,
          assert: true,
          warn: true,
        }),
        pluginTransformFlowStripTypes,
      ],
    },
    production: {
      plugins: [pluginTransformFlowStripTypes],
    },
  },
};

module.exports = basePreset;
