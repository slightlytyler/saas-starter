import { combineResolvers } from 'apollo-resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import authResolvers from 'features/auth/resolvers';
import postResolvers from 'features/post/resolvers';
import userResolvers from 'features/user/resolvers';
import AuthSchema from 'features/auth/schema';
import PostSchema from 'features/post/schema';
import UserSchema from 'features/user/schema';

const SchemaDef = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const QueryTypeDef = `
  type Query {
    _: String # placeholder
  }
`;

const MutationTypeDef = `
  type Mutation {
    _: String # placeholder
  }
`;

const typeDefs = [
  SchemaDef,
  QueryTypeDef,
  MutationTypeDef,
  AuthSchema,
  PostSchema,
  UserSchema,
];

const resolvers = combineResolvers([
  authResolvers,
  postResolvers,
  userResolvers,
]);

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default executableSchema;
