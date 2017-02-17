import gql from 'graphql-tag';
import * as fragments from './fragments';

export const GlobalFeed = gql`
  query GlobalFeed {
    allPosts(orderBy: createdAt_DESC) {
      ...PostObject
    }
  }
  ${fragments.PostObject}
`;

export const GroupFeed = gql`
  query GroupFeed($slug: String!) {
    Group(slug: $slug) {
      id
      name
      posts {
        ...PostObject
      }
    }
  }
  ${fragments.PostObject}
`;
