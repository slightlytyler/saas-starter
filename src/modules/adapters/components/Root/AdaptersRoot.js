import selectQuery from 'common/selectors/selectQuery';
import React, { PropTypes } from 'react';
import { Match, Miss } from 'react-router';
import { CodeSplit } from 'code-split-component';

const AdaptersRoot = ({ pathname }) => (
  <div>
    <Match
      exactly
      pattern={pathname}
      render={({ location }) => (
        <CodeSplit
          chunkName="AdaptersCollection"
          modules={{
            // eslint-disable-next-line global-require
            CollectionFetcher: require('../CollectionFetcher'),
            // eslint-disable-next-line global-require
            CollectionViewer: require('../CollectionViewer'),
          }}
        >
          {({ CollectionFetcher, CollectionViewer }) => {
            if (!CollectionFetcher) return <div>Loading...</div>;
            return (
              <CollectionFetcher query={selectQuery(location)}>
                {({ collection }) => {
                  if (!CollectionViewer) return <div>Loading...</div>;
                  return <CollectionViewer collection={collection} />;
                }}
              </CollectionFetcher>
            );
          }}
        </CodeSplit>
      )}
    />
    <Match
      pattern={`${pathname}/:adapterId`}
      render={({ params: { adapterId } }) => (
        <div>
          <Match
            pattern={`${pathname}/new`}
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
          <Miss
            render={() => (
              <CodeSplit
                chunkName="AdaptersRecord"
                modules={{
                  // eslint-disable-next-line global-require
                  RecordFetcher: require('../RecordFetcher'),
                }}
              >
                {({ RecordFetcher }) => {
                  if (!RecordFetcher) return <div>Loading...</div>;
                  return (
                    <RecordFetcher id={adapterId}>
                      {({ record }) => (
                        <div>
                          <Match
                            exactly
                            pattern={`${pathname}/:adapterId`}
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
                          <Match
                            exactly
                            pattern={`${pathname}/:adapterId/edit`}
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
                        </div>
                      )}
                    </RecordFetcher>
                  );
                }}
              </CodeSplit>
            )}
          />
        </div>
      )}
    />
  </div>
);

AdaptersRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AdaptersRoot;
