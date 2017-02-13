import gql from 'graphql-tag';
import * as fragments from './fragments';

export const CreatePost = gql`
  mutation CreatePost ($authorId: ID!, $body: String!){
    createPost(authorId: $authorId, body: $body) {
      ...PostObject
    }
  }
  ${fragments.PostObject}
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
      ...PostObject
    }
  }
  ${fragments.PostObject}
`;
