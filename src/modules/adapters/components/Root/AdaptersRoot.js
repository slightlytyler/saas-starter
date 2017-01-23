import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { flattenProp, getContext, lifecycle } from 'recompose';
import init from '../../init';
import CollectionViewer from '../CollectionViewer';
import RecordCreator from '../RecordCreator';
import RecordEditor from '../RecordEditor';

const AdaptersRoot = ({ path }) => (
  <Switch>
    <Route component={CollectionViewer} exact path={path} />
    <Route component={RecordCreator} path={`${path}/new`} />
    <Route component={RecordEditor} path={`${path}/:adapterId`} />
  </Switch>
);

AdaptersRoot.propTypes = {
  path: PropTypes.string.isRequired,
};

export default compose(
  getContext({ store: PropTypes.object.isRequired }),
  lifecycle({
    componentWillMount() {
      init(this.props.store);
    },
  }),
  flattenProp('match'),
)(AdaptersRoot);
