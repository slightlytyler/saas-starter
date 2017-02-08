import gql from 'graphql-tag';

export const createPost = gql`
  mutation createPost ($body: String!){
    createPost(body: $body) {
      id
      body
    }
  }
`;
