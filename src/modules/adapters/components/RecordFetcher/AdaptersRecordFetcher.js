import React, { PropTypes } from 'react';

const AdaptersRecordFetcher = ({ children, id }) => (
  <div>
    AdaptersRecordFetcher : {id}
    {children({})}
  </div>
);

AdaptersRecordFetcher.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AdaptersRecordFetcher;
