import React, { PropTypes } from 'react';

const AdaptersRecordViewer = ({ record }) => {
  if (record.loading) return <div>Loading...</div>;
  return (
    <div>{record.body.id}</div>
  );
};

AdaptersRecordViewer.propTypes = {
  record: PropTypes.object,
};

AdaptersRecordViewer.defaultProps = {
  record: null,
};

export default AdaptersRecordViewer;
