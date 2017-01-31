import DataTable from 'common/components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './UsersTableRowActionsMenu';
import withRecord from '../../containers/withRecord';

const UsersTableRow = ({ record }) => {
  if (record.deleted) return false;
  return (
    <DataTable.Row>
      <DataTable.RowColumn>
        {record.body.username}
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {record.body.email}
      </DataTable.RowColumn>
      <DataTable.RowColumn actions>
        <ActionsMenu email={record.body.email} id={record.body.id} />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

UsersTableRow.propTypes = {
  record: PropTypes.object.isRequired,
};

export default withRecord({ fetchEvents: false })(UsersTableRow);
