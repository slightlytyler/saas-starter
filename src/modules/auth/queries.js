import gql from 'graphql-tag';

export const CurrentUser = gql`
  query CurrentUser {
    user {
      id,
      name
    }
  }
`;

export const User = gql`
  query User($auth0UserId: String!) {
    User(auth0UserId: $auth0UserId) {
      id
      name
    }
  }
`;
