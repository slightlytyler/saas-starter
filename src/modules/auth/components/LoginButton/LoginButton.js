import Auth0LockPasswordless from 'auth0-lock-passwordless';
import { RaisedButton } from 'material-ui';
import gql from 'graphql-tag';
import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { LOCAL_STORAGE_AUTH_KEY } from 'src/config';

class LoginButton extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.auth0lock = new Auth0LockPasswordless('zjmX61BWhXdXf8erFCIoGwe8XHAM3cCw', 'paep.auth0.com');
  }

  start = () => this.auth0lock.sms(
    { autoclose: true },
    (error, profile, idToken) => {
      if (!error) {
        window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, idToken);
        this.props.createUser({ variables: { idToken, name: 'slightlytyler' } });
      }
    },
  );

  render = () => (
    <RaisedButton label="Login" onTouchTap={this.start} />
  );
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name) {
      id
    }
  }
`;

const container = graphql(createUser, { name: 'createUser' });

export default container(LoginButton);
