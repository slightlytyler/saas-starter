import { compose } from 'lodash/fp';
import React, { PropTypes } from 'react';
import withRecord from '../../containers/withRecord';
import withRecordFetcher from '../../containers/withRecordFetcher';

const AdaptersRecordViewer = ({ record }) => {
  if (!record || record.loading) return <div>Loading...</div>;
  return (
    <div>{record.body.id} - {record.body.name}</div>
  );
};

AdaptersRecordViewer.propTypes = {
  record: PropTypes.object,
};

AdaptersRecordViewer.defaultProps = {
  record: null,
};

export default compose(
  withRecordFetcher,
  withRecord,
)(AdaptersRecordViewer);
