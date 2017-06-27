import { _ } from 'lodash/fp';
import { setDisplayName, wrapDisplayName } from 'recompose';

const wrapAndSetDisplayName = wrapperName =>
  setDisplayName(wrapDisplayName(_, wrapperName));

export default wrapAndSetDisplayName;
