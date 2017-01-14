import ActionsProvider from 'components/ActionsProvider';
import React from 'react';
import Form from '../Form';
import { createRecord } from '../../actions';

const AdaptersRecordCreator = () => (
  <ActionsProvider creators={{ createRecord }}>
    {({ actions }) => <Form onSubmit={actions.createRecord} />}
  </ActionsProvider>
);

export default AdaptersRecordCreator;
