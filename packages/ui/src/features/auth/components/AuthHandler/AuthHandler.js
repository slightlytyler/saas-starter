import {compose} from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import {gql, graphql} from 'react-apollo';
import {lifecycle, setDisplayName, setPropTypes} from 'recompose';

export const AuthHandler = () => <div>Logging you in now...</div>;

const signInMutation = gql`
  mutation SignIn($code: String!) {
    signIn(code: $code) {
      email
    }
  }
`;

export const container = compose(
  setDisplayName('AuthHandler'),
  setPropTypes({
    code: PropTypes.string.isRequired,
  }),
  graphql(signInMutation, {
    props: ({mutate, ownProps}) => ({
      onAuthenticate: () => mutate({code: ownProps.code}),
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.onAuthenticate();
    },
  }),
);

export default container(AuthHandler);
