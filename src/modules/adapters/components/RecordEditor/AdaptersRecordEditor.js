import colors from 'colors';
import selectParamByKeyFromMatch from 'common/selectors/selectParamByKeyFromMatch';
import ActionsMenu from 'components/ActionsMenu';
import InputBlock from 'components/InputBlock';
import spinnerWhileLoading from 'containers/spinnerWhileLoading';
import withActions from 'containers/withActions';
import withLocation from 'containers/withLocation';
import { compose, get } from 'lodash/fp';
import { List, ListItem, RaisedButton } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Route } from 'react-router';
import { flattenProp, mapProps } from 'recompose';
import Form from '../Form';
import { updateRecord } from '../../actions';
import withRecord from '../../containers/withRecord';

const RecordEditor = ({ defaultValue, isExact, onSubmit, url }) => (
  <Box column>
    <Route path={`${url}/general`}>
      {({ history, match }) => (
        <InputBlock
          expand={Boolean(match)}
          icon="code"
          onExpand={expand => {
            if (isExact) return history.push(`${url}/general`);
            if (!expand) return history.goBack();
            return history.replace(`${url}/general`);
          }}
          title={defaultValue.name}
        >
          <Form defaultValue={defaultValue} onSubmit={onSubmit} />
        </InputBlock>
      )}
    </Route>
    <Route path={`${url}/operations`}>
      {({ history, match }) => (
        <InputBlock
          expand={Boolean(match)}
          icon="layers"
          onExpand={expand => {
            if (isExact) return history.push(`${url}/operations`);
            if (!expand) return history.goBack();
            return history.replace(`${url}/operations`);
          }}
          title="Operations"
        >
          <List>
            <ListItem
              primaryText="Operation 1"
              rightIconButton={
                <ActionsMenu
                  items={[
                    { action: () => {}, id: 'edit', label: 'Edit Operation' },
                    { action: () => {}, id: 'test', label: 'Test Operation' },
                    {
                      action: () => {},
                      id: 'delete',
                      label: 'Delete Operation',
                      style: { color: colors.red50 },
                    },
                  ]}
                />
              }
              secondaryText="An operation description goes here"
            />
          </List>
          <Box style={{ padding: '16px' }}>
            <RaisedButton label="New Operation" primary />
          </Box>
        </InputBlock>
      )}
    </Route>
  </Box>
);

RecordEditor.propTypes = {
  defaultValue: PropTypes.object.isRequired,
  isExact: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default compose(
  mapProps(props => ({
    ...props,
    id: selectParamByKeyFromMatch(props.match, 'adapterId'),
  })),
  flattenProp('match'),
  withRecord(),
  withLocation,
  withActions({ onSubmit: updateRecord }),
  mapProps(props => ({
    ...props,
    defaultValue: get('body', props.record),
    onSubmit: props.onSubmit,
  })),
  spinnerWhileLoading(props => !props.defaultValue),
)(RecordEditor);
