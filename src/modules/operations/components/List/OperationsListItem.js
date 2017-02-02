import spinnerWhileLoading from 'common/containers/spinnerWhileLoading';
import { compose, get } from 'lodash/fp';
import { ListItem } from 'material-ui';
import React from 'react';
import { mapProps } from 'recompose';
import ActionsMenu from './OperationsListItemActionsMenu';
import withRecord from '../../containers/withRecord';

const container = compose(
  withRecord(),
  spinnerWhileLoading(props => !props.record || get('loading', props.record)),
  mapProps(props => ({
    ...props,
    primaryText: props.record.body.name,
    rightIconButton: <ActionsMenu />,
    secondaryText: props.record.body.description,
  })),
);

export default container(ListItem);
