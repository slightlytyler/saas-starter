import gql from 'graphql-tag';

export const CurrentUserObject = gql`
  fragment CurrentUserObject on User {
    id
    name
  }
`;
