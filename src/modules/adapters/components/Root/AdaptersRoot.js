import selectParamByKeyFromMatch from 'common/selectors/selectParamByKeyFromMatch';
import selectQueryFromMatch from 'common/selectors/selectQueryFromMatch';
import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { getContext, lifecycle } from 'recompose';
import init from '../../init';
import CollectionViewer from '../CollectionViewer';
import RecordCreator from '../RecordCreator';
import RecordEditor from '../RecordEditor';

const AdaptersRoot = ({ path }) => (
  <Switch>
    <Route
      exact
      path={path}
      render={({ match }) => <CollectionViewer query={selectQueryFromMatch(match)} />}
    />
    <Route component={RecordCreator} path={`${path}/new`} />
    <Route
      path={`${path}/:adapterId`}
      render={({ match }) => (
        <RecordEditor
          id={selectParamByKeyFromMatch(match, 'adapterId')}
          rootMatch={match}
        />
      )}
    />
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
)(AdaptersRoot);
