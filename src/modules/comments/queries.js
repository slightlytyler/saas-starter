import gql from 'graphql-tag';

export const CommentsOnPost = gql`
  query CommentsOnPost($postId: ID!) {
    allComments(filter: { parentPost: { id: $postId } }) {
      id
      body
      createdAt
      author {
        id
        name
      }
      parentPost {
        id
      }
    }
  }
`;
