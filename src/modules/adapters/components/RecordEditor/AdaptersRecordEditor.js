import ActionsProvider from 'components/ActionsProvider';
import { get } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Form from '../Form';
import { updateRecord } from '../../actions';

const AdaptersRecordEditor = ({ record }) => (
  <ActionsProvider creators={{ updateRecord }}>
    {({ actions }) => (
      <Form defaultValue={get('body', record)} onSubmit={actions.updateRecord} />
    )}
  </ActionsProvider>
);

AdaptersRecordEditor.propTypes = {
  record: PropTypes.object,
};

AdaptersRecordEditor.defaultProps = {
  record: null,
};

export default AdaptersRecordEditor;
