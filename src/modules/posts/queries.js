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
