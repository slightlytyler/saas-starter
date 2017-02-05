import gql from 'graphql-tag';

export const currentUser = gql`
  query {
    user {
      id,
      name
    }
  }
`;

export const user = gql`
  query user($auth0UserId: String!) {
    User(auth0UserId: $auth0UserId) {
      id
      name
    }
  }
`;
