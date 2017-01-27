import { PropTypes } from 'react';

const matchPropType = PropTypes.shape({
  isExact: PropTypes.bool.isRequired,
  params: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

export default matchPropType;
