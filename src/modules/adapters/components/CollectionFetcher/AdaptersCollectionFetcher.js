import CollectionFetcher from 'components/CollectionFetcher';
import { fetchCollection } from 'modules/adapters/actions';
import { selectCollectionByQuery } from 'modules/adapters/selectors';
import React, { PropTypes } from 'react';

const AdaptersCollectionFetcher = ({ children, query }) => (
  <CollectionFetcher
    action={fetchCollection}
    query={query}
    selector={selectCollectionByQuery}
  >
    {({ collection }) => children({ collection })}
  </CollectionFetcher>
);

AdaptersCollectionFetcher.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.object,
};

AdaptersCollectionFetcher.defaultProps = {
  query: {},
};

export default AdaptersCollectionFetcher;
