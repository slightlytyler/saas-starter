import gql from 'graphql-tag';

export const CommentObject = gql`
  fragment CommentObject on Comment {
    id
    body
    createdAt
    parentComment {
      id
    }
    parentPost {
      id
    }
    author {
      id
      name
    }
  }
`;
