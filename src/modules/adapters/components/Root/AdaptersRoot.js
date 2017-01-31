import matchPropType from 'common/propTypes/match';
import withModuleInit from 'containers/withModuleInit';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CollectionViewer from '../CollectionViewer';
import RecordBuilder from '../RecordBuilder';
import init from '../../init';

const AdaptersRoot = ({ match }) => (
  <Switch>
    <Route component={CollectionViewer} exact path={match.url} />
    <Route component={RecordBuilder} path={`${match.url}/:adapterId`} />
  </Switch>
);

AdaptersRoot.propTypes = {
  match: matchPropType.isRequired,
};

export default withModuleInit(init)(AdaptersRoot);
