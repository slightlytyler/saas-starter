import RecordFetcher from 'components/RecordFetcher';
import { fetchRecord } from 'modules/adapters/actions';
import React, { PropTypes } from 'react';

const AdaptersRecordFetcher = ({ children, id }) => (
  <RecordFetcher action={fetchRecord} id={id}>
    {children}
  </RecordFetcher>
);

AdaptersRecordFetcher.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

export default AdaptersRecordFetcher;
