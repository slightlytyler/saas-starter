const PostTypeDef = `
  type Post {
    id: ID!
    name: String!
  }
`;

const PostRootExt = `
  extend type Query {
    post: Post
  }
`;

export const typeDefs = () => [PostTypeDef, PostRootExt];

export const resolvers = {
  queries: {
    post: () => ({id: 'a', name: 'b'}),
  },
};
