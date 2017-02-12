import { graphql } from 'react-apollo';
import * as queries from '../../queries';

const withCurrentUser = graphql(queries.CurrentUser, {
  options: { noFetch: true },
  props: ({ data }) => ({
    currentUser: data.user,
  }),
});

export default withCurrentUser;
