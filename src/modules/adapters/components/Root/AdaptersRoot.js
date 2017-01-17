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
        render={({ location }) => (
          <CodeSplit
            chunkName="AdaptersCollection"
            modules={{
              // eslint-disable-next-line global-require
              CollectionFetcher: require('../CollectionFetcher'),
              // eslint-disable-next-line global-require
              CollectionSelector: require('../CollectionSelector'),
              // eslint-disable-next-line global-require
              CollectionViewer: require('../CollectionViewer'),
            }}
          >
            {({ CollectionFetcher, CollectionSelector, CollectionViewer }) => {
              if (!(CollectionFetcher || CollectionSelector)) return <div>Loading...</div>;
              return (
                <CollectionFetcher query={selectQuery(location)}>
                  <CollectionSelector query={selectQuery(location)}>
                    {({ collection }) => {
                      if (!CollectionViewer) return <div>Loading...</div>;
                      return <CollectionViewer collection={collection} />;
                    }}
                  </CollectionSelector>
                </CollectionFetcher>
              );
            }}
          </CodeSplit>
        )}
      />
      <Route
        path={`${pathname}/:adapterId`}
        render={({ match: { params: { adapterId } } }) => (
          <FitContainer>
            <Switch>
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
                render={() => (
                  <CodeSplit
                    chunkName="AdaptersRecord"
                    modules={{
                      // eslint-disable-next-line global-require
                      RecordFetcher: require('../RecordFetcher'),
                      // eslint-disable-next-line global-require
                      RecordSelector: require('../RecordSelector'),
                    }}
                  >
                    {({ RecordFetcher, RecordSelector }) => {
                      if (!(RecordFetcher || RecordSelector)) return <div>Loading...</div>;
                      return (
                        <RecordFetcher id={adapterId}>
                          <RecordSelector id={adapterId}>
                            {({ record }) => (
                              <Switch>
                                <Route
                                  exactly
                                  path={`${pathname}/:adapterId`}
                                  render={() => (
                                    <CodeSplit
                                      chunkName="AdaptersRecordViewer"
                                      modules={{
                                        // eslint-disable-next-line global-require
                                        RecordViewer: require('../RecordViewer'),
                                      }}
                                    >
                                      {({ RecordViewer }) => {
                                        if (!RecordViewer) return <div>Loading...</div>;
                                        return <RecordViewer record={record} />;
                                      }}
                                    </CodeSplit>
                                  )}
                                />
                                <Route
                                  exactly
                                  path={`${pathname}/:adapterId/edit`}
                                  render={() => (
                                    <CodeSplit
                                      chunkName="AdaptersRecordEditor"
                                      modules={{
                                        // eslint-disable-next-line global-require
                                        RecordEditor: require('../RecordEditor'),
                                      }}
                                    >
                                      {({ RecordEditor }) => {
                                        if (!RecordEditor) return <div>Loading...</div>;
                                        return <RecordEditor record={record} />;
                                      }}
                                    </CodeSplit>
                                  )}
                                />
                              </Switch>
                            )}
                          </RecordSelector>
                        </RecordFetcher>
                      );
                    }}
                  </CodeSplit>
                )}
              />
            </Switch>
          </FitContainer>
        )}
      />
    </Switch>
  </FitContainer>
);

AdaptersRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AdaptersRoot;
