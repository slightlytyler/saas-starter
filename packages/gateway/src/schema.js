import {merge} from 'lodash/fp';
import {makeExecutableSchema} from 'graphql-tools';
import PostSchema from 'features/post/schema';

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
  PostSchema.typeDefs,
];

const resolvers = {
  Query: merge({}, PostSchema.resolvers.queries),
  Mutation: merge({}, PostSchema.resolvers.mutations),
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;