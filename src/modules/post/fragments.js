import gql from 'graphql-tag';

export const PostObject = gql`
  fragment PostObject on Post {
    id
    body
    createdAt
    author {
      id
      name
    }
  }
`;
