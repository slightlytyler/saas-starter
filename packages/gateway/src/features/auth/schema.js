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
    authenticate(code: String!): User
    deauthenticate: Boolean
  }
`;

const schema = () => [AuthTypeDef, AuthRootTypeExt];

export default schema;
