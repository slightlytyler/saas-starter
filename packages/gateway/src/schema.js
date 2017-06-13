import {merge} from 'lodash/fp';
import {makeExecutableSchema} from 'graphql-tools';
import * as Post from 'features/post/schema';

const SchemaDefinition = `
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
  SchemaDefinition,
  QueryTypeDef,
  MutationTypeDef,
  Post.typeDefs,
];

const resolvers = {
  Query: merge({}, Post.resolvers.queries),
  Mutation: merge({}, Post.resolvers.mutations),
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
