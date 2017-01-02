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
  plugins: [
    ...baseConfig.plugins,
    new CodeSplitWebpackPlugin(),
  ],
}));
