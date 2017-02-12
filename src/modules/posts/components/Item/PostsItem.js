import avatarPlaceholder from 'assets/images/avatar-placeholder.jpeg';
import colors from 'colors';
import MaterialIcon from 'common/components/MaterialIcon';
import MultiLineText from 'common/components/MultiLineText';
import update from 'immutability-helper';
import { compose, eq, findIndex, get } from 'lodash/fp';
import { Avatar, Divider, IconButton, IconMenu, MenuItem, Paper } from 'material-ui';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import { Box } from 'react-layout-components';
import { mapProps, withState } from 'recompose';
import Editor from '../Editor';
import * as mutations from '../../mutations';

// eslint-disable-next-line react/prop-types
const renderBody = ({ text }) => <MultiLineText>{text}</MultiLineText>;

// eslint-disable-next-line react/prop-types
const renderEditor = ({ defaultValue, onSubmit }) => (
  <Editor defaultValue={defaultValue} onSubmit={onSubmit} />
);

const PostsItem = props => (
  <Paper style={{ marginTop: '16px', padding: '16px' }}>
    <Box alignItems="flex-start" justifyContent="space-between">
      <Box alignItems="center">
        <Avatar src={avatarPlaceholder} />
        <Box column style={{ marginLeft: '16px' }}>
          <div>{props.record.author.name}</div>
          <div style={{ color: colors.grey30, fontSize: '12px' }}>{moment(props.record.createdAt).fromNow()}</div>
        </Box>
      </Box>
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MaterialIcon>more_vert</MaterialIcon>
          </IconButton>
        }
      >
        <MenuItem
          leftIcon={<MaterialIcon>mode_edit</MaterialIcon>}
          onTouchTap={props.onEditStart}
          primaryText="Edit"
        />
        <MenuItem
          leftIcon={<MaterialIcon>shuffle</MaterialIcon>}
          primaryText="Crosspost"
        />
        <MenuItem
          leftIcon={<MaterialIcon>delete</MaterialIcon>}
          onTouchTap={props.onDelete}
          primaryText="Delete"
        />
      </IconMenu>
    </Box>
    <Divider style={{ marginBottom: '16px', marginTop: '6px' }} />
    {props.isEditing
      ? renderEditor({
        defaultValue: props.record,
        onSubmit: data => {
          props.onEditEnd();
          props.onUpdate(data);
        },
      })
      : renderBody({ text: props.record.body })
    }

  </Paper>
);

PostsItem.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  record: PropTypes.shape({
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

const container = compose(
  graphql(mutations.DeletePost, {
    props: ({ mutate, ownProps }) => ({
      onDelete: () => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          deletePost: {
            __typename: 'Post',
            id: ownProps.record.id,
          },
        },
        updateQueries: {
          GlobalFeed: prev => update(prev, {
            allPosts: {
              $splice: [[findIndex(compose(eq(ownProps.record.id), get('id')), prev.allPosts), 1]],
            },
          }),
        },
        variables: { id: ownProps.record.id },
      }),
    }),
  }),
  graphql(mutations.UpdatePost, {
    props: ({ mutate, ownProps }) => ({
      onUpdate: data => mutate({
        optimisticResponse: {
          __typename: 'Mutation',
          updatePost: {
            __typename: 'Post',
            ...ownProps.record,
            ...data,
          },
        },
        variables: { id: ownProps.record.id, ...data },
      }),
    }),
  }),
  withState('isEditing', 'setEditing', false),
  mapProps(props => ({
    isEditing: props.isEditing,
    onDelete: props.onDelete,
    onEditStart: () => setTimeout(() => props.setEditing(true), 800),
    onEditEnd: () => props.setEditing(false),
    onUpdate: props.onUpdate,
    record: props.record,
  })),
);

export default container(PostsItem);
