import { PropTypes } from 'react';
import { getContext } from 'recompose';

const withCurrentUser = getContext({ currentUser: PropTypes.object });

export default withCurrentUser;
