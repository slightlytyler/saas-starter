import { Avatar } from 'material-ui';
import { capitalize, compose, first } from 'lodash/fp';
import React, { PropTypes } from 'react';

const UserAvatar = ({ user, ...props }) => (
  <Avatar {...props}>{compose(capitalize, first)(user.name)}</Avatar>
);

UserAvatar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserAvatar;
