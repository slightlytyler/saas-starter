import { compose } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';
import { lifecycle, setDisplayName, setPropTypes } from 'recompose';

type Props = {
  code: string,
};

export const AuthHandler = (props: Props) =>
  <div>Logging you in now with {props.code}...</div>;

const authenticateMutation = gql`
  mutation SignIn($code: String!) {
    authenticate(code: $code) {
      email
    }
  }
`;

export const container = compose(
  setDisplayName('AuthHandler'),
  setPropTypes({
    code: PropTypes.string.isRequired,
  }),
  graphql(authenticateMutation, {
    props: ({ mutate, ownProps }) => ({
      onAuthenticate: () => mutate({ code: ownProps.code }),
    }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.onAuthenticate();
    },
  }),
);

export default container(AuthHandler);
