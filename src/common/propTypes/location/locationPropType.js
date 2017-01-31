import { PropTypes } from 'react';

const locationPropTypes = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.object,
});

export default locationPropTypes;
