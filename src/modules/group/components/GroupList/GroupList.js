import spinnerWhile from 'common/containers/spinnerWhile';
import { compose, get, last, map, split } from 'lodash/fp';
import { List, ListItem, makeSelectable, Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { withProps } from 'recompose';
import * as queries from '../../queries';

const SelectableList = makeSelectable(List);

const GroupList = props => (
  <Paper style={{ marginRight: '1em', width: '15em' }}>
    <SelectableList value={props.currentGroupSlug}>
      {map(
        group => (
          <ListItem
            key={group.slug}
            onTouchTap={() => props.onSelect(group)}
            primaryText={group.name}
            value={group.slug}
          />
        ),
        props.groups,
      )}
    </SelectableList>
  </Paper>
);

GroupList.propTypes = {
  currentGroupSlug: PropTypes.string.isRequired,
  groups: PropTypes.array.isRequired,
};

const container = compose(
  withProps(props => ({
    onSelect: ({ slug }) => props.push(`${props.match.url}/${slug}`),
    currentGroupSlug: compose(last, split('/'))(props.location.pathname),
  })),
  graphql(queries.GroupList, {
    props: ({ data }) => ({
      loading: data.loading,
      groups: data.allGroups,
    }),
  }),
  compose(spinnerWhile, get)('loading'),
);

export default container(GroupList);
