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
