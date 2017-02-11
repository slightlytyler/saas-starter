import gql from 'graphql-tag';

export const SignInUser = gql`
  mutation SignInUser($idToken: String!) {
    signinUser(auth0: { idToken: $idToken }) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const SignUpUser = gql`
  mutation SignUpUser($idToken: String!, $name: String!) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
    ) {
      id
      name
    }
  }
`;
