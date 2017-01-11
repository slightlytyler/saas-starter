import path from 'path';
import CodeSplitWebpackPlugin from 'code-split-component/webpack';
import { createConfig } from './base.config';

export default createConfig(({ __src, baseConfig }) => ({
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    main: [
      path.join(__src, 'main.js'),
    ],
  },
  output: {
    ...baseConfig.output,
    filename: '[chunkhash].[name].bundle.js',
  },
  plugins: [
    ...baseConfig.plugins,
    new CodeSplitWebpackPlugin(),
  ],
  performance: {
    hints: "warning",
  },
}));
