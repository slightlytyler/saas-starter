import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { mapProps } from 'recompose';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import withCurrentUser from '../../containers/withCurrentUser';

const AuthenticationButton = ({ isAuthenticated }) => (
  isAuthenticated ? <LogoutButton /> : <LoginButton />
);

AuthenticationButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const container = compose(
  withCurrentUser,
  mapProps(props => ({ isAuthenticated: Boolean(props.currentUser) })),
);

export default container(AuthenticationButton);
