import Auth0LockPasswordless from 'auth0-lock-passwordless';
import { RaisedButton } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import { withApollo } from 'react-apollo';
import { setToken } from '../../helpers';
import * as mutations from '../../mutations';
import * as queries from '../../queries';

class LoginButton extends Component {
  static propTypes = {
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
      query: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.auth0lock = new Auth0LockPasswordless(
      'zjmX61BWhXdXf8erFCIoGwe8XHAM3cCw',
      'paep.auth0.com',
    );
  }

  start = () =>
    this.auth0lock.sms({ autoclose: true }, async (error, profile, idToken) => {
      if (!error) {
        try {
          const { data: { User: user } } = await this.props.client.query({
            query: queries.User,
            variables: { auth0UserId: profile.user_id },
          });
          if (!user) {
            this.props.client.mutate({
              mutation: mutations.SignUpUser,
              updateQueries: {
                CurrentUser: (prev, { mutationResult }) => ({
                  user: mutationResult.data.createUser,
                }),
              },
              variables: { idToken, name: '@@placeholder' },
            });
          } else {
            this.props.client.mutate({
              mutation: mutations.SignInUser,
              updateQueries: {
                CurrentUser: (prev, { mutationResult }) => ({
                  user: mutationResult.data.signinUser.user,
                }),
              },
              variables: { idToken },
            });
          }
          setToken(idToken);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    });

  render = () => <RaisedButton label="Login" onTouchTap={this.start} />;
}

export default withApollo(LoginButton);
