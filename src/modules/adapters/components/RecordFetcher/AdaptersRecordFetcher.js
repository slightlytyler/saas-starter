import React, { PropTypes } from 'react';

const AdaptersRecordFetcher = ({ children }) => (
  <div>
    AdaptersRecordFetcher
    {children({})}
  </div>
);

AdaptersRecordFetcher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AdaptersRecordFetcher;
