import gql from 'graphql-tag';

export const allPosts = gql`
  query allPosts {
    allPosts {
      id
      body
    }
  }
`;
