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
    signIn(code: String!): User
    signUp: User
    signOut: Boolean
  }
`;

const schema = () => [AuthTypeDef, AuthRootTypeExt];

export default schema;
