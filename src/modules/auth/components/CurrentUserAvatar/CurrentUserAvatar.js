import UserAvatar from 'modules/user/components/UserAvatar';
import React, { PropTypes } from 'react';
import withCurrentUser from '../../containers/withCurrentUser';

const CurrentUserAvatar = ({ currentUser, ...props }) => (
  <UserAvatar {...props} user={currentUser} />
);

CurrentUserAvatar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const container = withCurrentUser;

export default container(CurrentUserAvatar);
