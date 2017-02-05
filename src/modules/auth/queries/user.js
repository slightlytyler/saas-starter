import gql from 'graphql-tag';

const userQuery = gql`
  query {
    user {
      id,
      name
    }
  }
`;

export default userQuery;
