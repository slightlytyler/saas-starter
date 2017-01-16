import RecordSelector from 'components/RecordSelector';
import { selectRecordById } from 'modules/adapters/selectors';
import React, { PropTypes } from 'react';

const AdaptersRecordSelector = ({ children, id }) => (
  <RecordSelector id={id} selector={selectRecordById}>
    {children}
  </RecordSelector>
);

AdaptersRecordSelector.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AdaptersRecordSelector;
