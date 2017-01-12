import React, { PropTypes } from 'react';
import Table from '../Table';

const AdaptersCollectionViewer = ({ collection: { ids, loading } }) => (
  <Table ids={ids} loading={loading} />
);

AdaptersCollectionViewer.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default AdaptersCollectionViewer;
