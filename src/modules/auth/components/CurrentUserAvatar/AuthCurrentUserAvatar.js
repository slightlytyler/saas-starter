import UserAvatar from 'modules/user/components/Avatar';
import React, { PropTypes } from 'react';
import withCurrentUser from '../../containers/withCurrentUser';

const AuthCurrentUserAvatar = ({ currentUser, ...props }) => (
  <UserAvatar {...props} user={currentUser} />
);

AuthCurrentUserAvatar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const container = withCurrentUser;

export default container(AuthCurrentUserAvatar);
