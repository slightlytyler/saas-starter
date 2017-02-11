import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { mapProps } from 'recompose';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import * as queries from '../../queries';

const AuthenticationButton = ({ isAuthenticated }) => (
  isAuthenticated ? <LogoutButton /> : <LoginButton />
);

AuthenticationButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const container = compose(
  graphql(queries.CurrentUser, { options: { forceFetch: true } }),
  mapProps(props => ({ isAuthenticated: Boolean(props.data.user) })),
);

export default container(AuthenticationButton);
