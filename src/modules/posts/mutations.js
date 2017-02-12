import gql from 'graphql-tag';

export const CreatePost = gql`
  mutation CreatePost ($authorId: ID!, $body: String!){
    createPost(authorId: $authorId, body: $body) {
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

export const UpdatePost = gql`
  mutation UpdatePost ($body: String!, $id: ID!){
    updatePost(body: $body, id: $id) {
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
