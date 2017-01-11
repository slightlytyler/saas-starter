import React, { PropTypes } from 'react';

const AdaptersCollectionFetcher = ({ children }) => (
  <div>
    AdaptersCollectionFetcher
    {children({})}
  </div>
);

AdaptersCollectionFetcher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AdaptersCollectionFetcher;
