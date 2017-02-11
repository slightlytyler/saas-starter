import gql from 'graphql-tag';

export const CreatePost = gql`
  mutation CreatePost ($body: String!){
    createPost(body: $body) {
      id
      body
      createdAt
      author {
        id
        name
      }
    }
  }
`;

export const DeletePost = gql`
  mutation DeletePost ($id: ID!){
    deletePost(id: $id) {
      id
    }
  }
`;
