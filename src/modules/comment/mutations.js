import gql from 'graphql-tag';
import * as fragments from './fragments';

export const CreateComment = gql`
  mutation CreateComment($authorId: ID!, $body: String!, $parentPostId: ID!) {
    createComment(authorId: $authorId, body: $body, parentPostId: $parentPostId) {
      ...CommentObject
    }
  }
  ${fragments.CommentObject}
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
      ...CommentObject
    }
  }
  ${fragments.CommentObject}
`;
