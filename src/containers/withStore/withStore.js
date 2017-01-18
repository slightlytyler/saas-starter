import { PropTypes } from 'react';
import { withContext } from 'recompose';

const withStore = withContext(
  { store: PropTypes.object.isRequired },
  ({ store }) => ({ store }),
);

export default withStore;
