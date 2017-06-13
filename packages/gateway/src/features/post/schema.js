import {isAuthenticatedResolver} from 'features/auth/resolvers';

const PostTypeDef = `
  type Post {
    id: ID!
    name: String!
  }
`;

const PostRootExt = `
  extend type Query {
    posts: [Post]
  }
`;

const typeDefs = () => [PostTypeDef, PostRootExt];

const resolvers = {
  Query: {
    posts: isAuthenticatedResolver.createResolver((_, __, ctx) =>
      ctx.models.post.findList(),
    ),
  },
};

const PostSchema = {
  typeDefs,
  resolvers,
};

export default PostSchema;
