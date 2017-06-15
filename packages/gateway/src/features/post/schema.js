const PostTypeDef = `
  type Post {
    id: ID!
    name: String!
  }
`;

const PostRootExt = `
  extend type Query {
    posts: [Post]
    post: Post
  }

  extend type Mutation {
    createPost: Post
    deletePost: Post
    updatePost: Post
  }
`;

const schema = () => [PostTypeDef, PostRootExt];

export default schema;
