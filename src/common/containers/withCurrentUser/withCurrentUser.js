import * as authQueries from 'modules/auth/queries';
import { graphql } from 'react-apollo';

const withCurrentUser = compose(
  graphql(authQueries.CurrentUser),
);

export default withCurrentUser;
