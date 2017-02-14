import gql from 'graphql-tag';
import * as fragments from './fragments';

export const CommentsOnPost = gql`
  query CommentsOnPost($postId: ID!) {
    allComments(filter: { parentPost: { id: $postId } }) {
      ...CommentObject
    }
  }
  ${fragments.CommentObject}
`;
