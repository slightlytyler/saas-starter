import { push } from 'connected-react-router';
import { compose, trimCharsEnd } from 'lodash/fp';
import path from 'path';

const pushRelativeToRootPath = rootPath => appendixPath => compose(
  push,
  trimCharsEnd('/'),
)(path.join(rootPath, appendixPath));

export default pushRelativeToRootPath;
