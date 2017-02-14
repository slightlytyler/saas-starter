import gql from 'graphql-tag';
import * as fragments from './fragments';

export const CurrentUser = gql`
  query CurrentUser {
    user {
      ...CurrentUserObject
    }
  }
  ${fragments.CurrentUserObject}
`;

export const User = gql`
  query User($auth0UserId: String!) {
    User(auth0UserId: $auth0UserId) {
      ...CurrentUserObject
    }
  }
  ${fragments.CurrentUserObject}
`;
