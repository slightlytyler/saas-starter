import gql from 'graphql-tag';

export const Group = gql`
  query Group($id: ID!) {
    Group(id: $id) {
      id
      name
      slug
      posts {
        id
        body
        author {
          id
          name
        }
      }
    }
  }
`;

export const GroupList = gql`
  query GroupList {
    allGroups {
      id
      name
      slug
      posts {
        id
        body
        author {
          id
          name
        }
      }
    }
  }
`;
