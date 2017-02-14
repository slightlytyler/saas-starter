import Identity from 'common/components/Identity';
import { compose, pick } from 'lodash/fp';
import { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { withContext } from 'recompose';
import * as queries from '../../queries';

const container = compose(
  graphql(queries.CurrentUser, {
    props: ({ data }) => ({
      currentUser: data.user,
    }),
    options: { forceFetch: true },
  }),
  withContext(
    { currentUser: PropTypes.object },
    pick('currentUser'),
  ),
);

export default container(Identity);
