import gql from 'graphql-tag';
import * as fragments from './fragments';

export const SignInUser = gql`
  mutation SignIn($idToken: String!) {
    signinUser(auth0: { idToken: $idToken }) {
      token
      user {
        ...CurrentUserObject
      }
    }
  }
  ${fragments.CurrentUserObject}
`;

export const SignUpUser = gql`
  mutation SignUpUser($idToken: String!, $name: String!) {
    createUser(authProvider: { auth0: { idToken: $idToken } }, name: $name) {
      ...CurrentUserObject
    }
  }
  ${fragments.CurrentUserObject}
`;
