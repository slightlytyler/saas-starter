import {UserTypeDef} from 'features/user/schema';

const AuthTypeDef = `
  type Auth {
    id: ID!
    email: String
    password: String!
    username: String!
  }
`;

const AuthRootTypeExt = `
  extend type Query {
    self: User
  }

  extend type Mutation {
    signIn: User
    signUp: User
    signOut: Boolean
  }
`;

const schema = () => [AuthTypeDef, AuthRootTypeExt, UserTypeDef];

export default schema;
