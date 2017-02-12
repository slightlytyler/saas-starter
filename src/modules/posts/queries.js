import gql from 'graphql-tag';

export const GlobalFeed = gql`
  query GlobalFeed {
    allPosts(orderBy: createdAt_DESC) {
      id
      body
      createdAt
      author {
        id
        name
      }
      comments {
        id
        body
        createdAt
        author {
          id
          name
        }
        parentComment {
          id
        }
        parentPost {
          id
        }
      }
    }
  }
`;
