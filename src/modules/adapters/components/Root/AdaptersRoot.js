import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { getContext, lifecycle, withContext } from 'recompose';
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
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withContext(
    { rootUrl: PropTypes.string.isRequired },
    props => ({ rootUrl: props.match.url }),
  ),
  getContext({ store: PropTypes.object.isRequired }),
  lifecycle({
    componentWillMount() {
      init(this.props.store);
    },
  }),
)(AdaptersRoot);
