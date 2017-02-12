import { Avatar } from 'material-ui';
import { capitalize, compose, first } from 'lodash/fp';
import React, { PropTypes } from 'react';
import withCurrentUser from '../../containers/withCurrentUser';

const AuthCurrentUserAvatar = ({ currentUser, ...props }) => (
  <Avatar {...props}>{compose(capitalize, first)(currentUser.name)}</Avatar>
);

AuthCurrentUserAvatar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const container = withCurrentUser;

export default container(AuthCurrentUserAvatar);
