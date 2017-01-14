import RecordFetcher from 'components/RecordFetcher';
import { fetchRecord } from 'modules/adapters/actions';
import { selectRecordById } from 'modules/adapters/selectors';
import React, { PropTypes } from 'react';

const AdaptersRecordFetcher = ({ children, id }) => (
  <RecordFetcher
    action={fetchRecord}
    id={id}
    selector={selectRecordById}
  >
    {children}
  </RecordFetcher>
);

AdaptersRecordFetcher.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AdaptersRecordFetcher;
