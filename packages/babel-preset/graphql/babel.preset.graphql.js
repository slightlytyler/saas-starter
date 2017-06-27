const presetNode = require('@saas-starter/babel-preset/node');
const presetStage0 = require('babel-preset-stage-0');

const graphqlPreset = () => ({
  presets: [presetNode],
});

module.exports = graphqlPreset;
