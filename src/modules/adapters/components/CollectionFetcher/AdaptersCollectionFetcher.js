import React, { PropTypes } from 'react';

const AdaptersCollectionFetcher = ({ children, query }) => (
  <div>
    AdaptersCollectionFetcher : {JSON.stringify(query)}
    {children({})}
  </div>
);

AdaptersCollectionFetcher.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.object,
};

AdaptersCollectionFetcher.defaultProps = {
  query: {},
};

export default AdaptersCollectionFetcher;
