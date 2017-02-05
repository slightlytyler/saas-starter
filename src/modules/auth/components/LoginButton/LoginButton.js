import Auth0LockPasswordless from 'auth0-lock-passwordless';
import { RaisedButton } from 'material-ui';
import gql from 'graphql-tag';
import React, { Component, PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import { LOCAL_STORAGE_AUTH_KEY } from 'src/config';
import userQuery from '../../queries/user';

class LoginButton extends Component {
  static propTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
      query: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.auth0lock = new Auth0LockPasswordless('zjmX61BWhXdXf8erFCIoGwe8XHAM3cCw', 'paep.auth0.com');
  }

  start = () => this.auth0lock.sms(
    { autoclose: true },
    async (error, profile, idToken) => {
      if (!error) {
        try {
          const { data: { User: user } } = await this.props.client.query({
            query: gql`
              query {
                User(
                  auth0UserId: "${profile.user_id}"
                ) {
                  id
                  name
                }
              }
            `,
          });
          if (!user) {
            this.props.client.mutate({
              mutation: gql`
                mutation {
                  createUser(
                    authProvider: { auth0: { idToken: "${idToken}" } }
                    name: "slightlytyler"
                  ) {
                    id
                    name
                  }
                }
              `,
              refetchQueries: [{ query: userQuery }],
            });
          }
          this.props.client.mutate({
            mutation: gql`
              mutation {
                signinUser(auth0: { idToken: "${idToken}" }) {
                  token
                  user {
                    id
                    name
                  }
                }
              }
            `,
            refetchQueries: [{ query: userQuery }],
          });
          window.localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, idToken);
        } catch (e) {
          console.log(e);
        }
      }
    },
  );

  render = () => (
    <RaisedButton label="Login" onTouchTap={this.start} />
  );
}

export default withApollo(LoginButton);
