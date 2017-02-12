import Identity from 'common/components/Identity';
import { graphql } from 'react-apollo';
import * as queries from '../../queries';

const container = graphql(queries.CurrentUser, {
  options: { forceFetch: true },
});

export default container(Identity);
