export const UserTypeDef = `
  type User {
    id: ID!
    email: String!
    password: String!
    username: String!
  }
`;

const UserRootExt = `
  extend type Query {
    user: User
  }
`;

const schema = () => [UserTypeDef, UserRootExt];

export default schema;
