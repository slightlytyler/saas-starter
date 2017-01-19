import selectQueryFromMatch from 'common/selectors/selectQueryFromMatch';
import CodeSplitRoute from 'components/CodeSplitRoute';
import React, { PropTypes } from 'react';
import { Switch } from 'react-router';

const AdaptersRoot = ({ pathname }) => (
  <Switch>
    <CodeSplitRoute
      chunkName="AdaptersCollection"
      exact
      modules={{
        // eslint-disable-next-line global-require
        CollectionViewer: require('../CollectionViewer'),
      }}
      path={pathname}
      render={({ CollectionViewer, match }) => {
        if (!CollectionViewer) return <div>Loading...</div>;
        return <CollectionViewer query={selectQueryFromMatch(match)} />;
      }}
    />
    <CodeSplitRoute
      chunkName="AdaptersRecordCreator"
      modules={{
        // eslint-disable-next-line global-require
        RecordCreator: require('../RecordCreator'),
      }}
      path={`${pathname}/new`}
      render={({ RecordCreator }) => {
        if (!RecordCreator) return <div>Loading...</div>;
        return <RecordCreator />;
      }}
    />
    <CodeSplitRoute
      chunkName="AdaptersRecordViewer"
      exact
      modules={{
        // eslint-disable-next-line global-require
        RecordViewer: require('../RecordViewer'),
      }}
      path={`${pathname}/:adapterId`}
      render={({ match, RecordViewer }) => {
        if (!RecordViewer) return <div>Loading...</div>;
        return <RecordViewer id={match.params.adapterId} />;
      }}
    />
    <CodeSplitRoute
      chunkName="AdaptersRecordEditor"
      modules={{
        // eslint-disable-next-line global-require
        RecordEditor: require('../RecordEditor'),
      }}
      path={`${pathname}/:adapterId/edit`}
      render={({ match, RecordEditor }) => {
        if (!RecordEditor) return <div>Loading...</div>;
        return <RecordEditor id={match.params.adapterId} />;
      }}
    />
  </Switch>
);

AdaptersRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AdaptersRoot;
