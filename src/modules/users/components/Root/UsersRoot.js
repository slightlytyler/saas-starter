import matchPropType from 'common/propTypes/match';
import withModuleInit from 'common/containers/withModuleInit';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CollectionViewer from '../CollectionViewer';
import Invite from '../Invite';
import init from '../../init';

const UsersRoot = ({ match }) => (
  <Switch>
    <Route component={CollectionViewer} exact path={match.url} />
    <Route component={Invite} path={`${match.url}/invite`} />
  </Switch>
);

UsersRoot.propTypes = {
  match: matchPropType.isRequired,
};

export default withModuleInit(init)(UsersRoot);
