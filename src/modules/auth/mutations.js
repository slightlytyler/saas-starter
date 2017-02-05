import gql from 'graphql-tag';

export const signInUser = gql`
  mutation signInUser($idToken: String!) {
    signinUser(auth0: { idToken: $idToken }) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const signUpUser = gql`
  mutation signUpUser($idToken: String!, $name: String!) {
    createUser(
      authProvider: { auth0: { idToken: $idToken } }
      name: $name
    ) {
      id
      name
    }
  }
`;
