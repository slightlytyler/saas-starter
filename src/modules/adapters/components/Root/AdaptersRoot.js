import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { getContext, lifecycle, mapProps, withContext } from 'recompose';
import CollectionViewer from '../CollectionViewer';
import RecordBuilder from '../RecordBuilder';
import init from '../../init';

const AdaptersRoot = ({ rootUrl }) => (
  <Switch>
    <Route component={CollectionViewer} exact path={rootUrl} />
    <Route component={RecordBuilder} path={`${rootUrl}/:adapterId`} />
  </Switch>
);

AdaptersRoot.propTypes = {
  rootUrl: PropTypes.string.isRequired,
};

export default compose(
  mapProps(props => ({ rootUrl: props.match.url })),
  withContext(
    { rootUrl: PropTypes.string.isRequired },
    props => ({ rootUrl: props.rootUrl }),
  ),
  getContext({ store: PropTypes.object.isRequired }),
  lifecycle({
    componentWillMount() {
      init(this.props.store);
    },
  }),
)(AdaptersRoot);
