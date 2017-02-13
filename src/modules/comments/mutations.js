import gql from 'graphql-tag';

export const CreateComment = gql`
  mutation CreateComment($authorId: ID!, $body: String!, $parentPostId: ID!) {
    createComment(authorId: $authorId, body: $body, parentPostId: $parentPostId) {
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
  }
`;

export const DeleteComment = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const UpdateComment = gql`
  mutation UpdateComment($body: String!, $id: ID!) {
    updateComment(body: $body, id: $id) {
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
  }
`;
