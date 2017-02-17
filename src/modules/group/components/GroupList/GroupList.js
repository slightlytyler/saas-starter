import { map } from 'lodash/fp';
import { List, ListItem, Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import * as queries from '../../queries';

const GroupList = props => (
  <Paper style={{ marginRight: '1em', width: '15em' }}>
    <List>
      {map(
        group => <ListItem key={group.slug} primaryText={group.name} />,
        props.groups,
      )}
    </List>
  </Paper>
);

GroupList.propTypes = {
  groups: PropTypes.array,
};

GroupList.defaultProps = {
  groups: [],
};

const container = graphql(queries.GroupList, {
  props: ({ data }) => ({
    loading: data.loading,
    groups: data.allGroups,
  }),
});

export default container(GroupList);
