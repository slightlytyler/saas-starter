import selectQuery from 'common/selectors/selectQuery';
import FitContainer from 'components/FitContainer';
import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router';
import { CodeSplit } from 'code-split-component';

const AdaptersRoot = ({ pathname }) => (
  <FitContainer>
    <Switch>
      <Route
        exact
        path={pathname}
        render={({ match }) => (
          <CodeSplit
            chunkName="AdaptersCollection"
            modules={{
              // eslint-disable-next-line global-require
              CollectionViewer: require('../CollectionViewer'),
            }}
          >
            {({ CollectionViewer }) => {
              if (!CollectionViewer) return <div>Loading...</div>;
              return <CollectionViewer query={selectQuery(match)} />;
            }}
          </CodeSplit>
        )}
      />
      <Route
        path={`${pathname}/new`}
        render={() => (
          <CodeSplit
            chunkName="AdaptersRecordCreator"
            modules={{
              // eslint-disable-next-line global-require
              RecordCreator: require('../RecordCreator'),
            }}
          >
            {({ RecordCreator }) => {
              if (!RecordCreator) return <div>Loading...</div>;
              return <RecordCreator />;
            }}
          </CodeSplit>
        )}
      />
      <Route
        exact
        path={`${pathname}/:adapterId`}
        render={({ match }) => (
          <CodeSplit
            chunkName="AdaptersRecordViewer"
            modules={{
              // eslint-disable-next-line global-require
              RecordViewer: require('../RecordViewer'),
            }}
          >
            {({ RecordViewer }) => {
              if (!RecordViewer) return <div>Loading...</div>;
              return <RecordViewer id={match.params.adapterId} />;
            }}
          </CodeSplit>
        )}
      />
      <Route
        path={`${pathname}/:adapterId/edit`}
        render={({ match }) => (
          <CodeSplit
            chunkName="AdaptersRecordEditor"
            modules={{
              // eslint-disable-next-line global-require
              RecordEditor: require('../RecordEditor'),
            }}
          >
            {({ RecordEditor }) => {
              if (!RecordEditor) return <div>Loading...</div>;
              return <RecordEditor id={match.params.adapterId} />;
            }}
          </CodeSplit>
        )}
      />
    </Switch>
  </FitContainer>
);

AdaptersRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AdaptersRoot;
