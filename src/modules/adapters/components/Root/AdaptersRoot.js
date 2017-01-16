import selectQuery from 'common/selectors/selectQuery';
import FitContainer from 'components/FitContainer';
import React, { PropTypes } from 'react';
import { Match, Miss } from 'react-router';
import { CodeSplit } from 'code-split-component';

const AdaptersRoot = ({ pathname }) => (
  <FitContainer>
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
    <Match
      pattern={`${pathname}/:adapterId`}
      render={({ params: { adapterId } }) => (
        <FitContainer>
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
                      </RecordSelector>
                    </RecordFetcher>
                  );
                }}
              </CodeSplit>
            )}
          />
        </FitContainer>
      )}
    />
  </FitContainer>
);

AdaptersRoot.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default AdaptersRoot;
