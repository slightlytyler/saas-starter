import Bool from 'components/Bool';
import { DataTableRow, DataTableRowColumn } from 'components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './AdaptersTableRowActionsMenu';
import RecordSelector from '../RecordSelector';

const renderStatus = status => (
  status === 'Creating image'
    ? <div>Loading</div>
    : status
);

const AdaptersTableRow = ({ id }) => (
  <RecordSelector id={id}>
    {({ record }) => (
      <DataTableRow>
        <DataTableRowColumn icon>
          <Bool value={record.body.enabled} />
        </DataTableRowColumn>
        <DataTableRowColumn icon>
          <Bool value={record.body.global} />
        </DataTableRowColumn>
        <DataTableRowColumn>{record.body.name}</DataTableRowColumn>
        <DataTableRowColumn>{renderStatus(record.body.status)}</DataTableRowColumn>
        <DataTableRowColumn actions>
          <ActionsMenu id={id} />
        </DataTableRowColumn>
      </DataTableRow>
    )}
  </RecordSelector>
);

AdaptersTableRow.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AdaptersTableRow;
