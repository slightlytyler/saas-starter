import DataTable from 'common/components/DataTable';
import React, { PropTypes } from 'react';
import ActionsMenu from './UsersTableRowActionsMenu';
import withRecord from '../../containers/withRecord';

const UsersTableRow = ({ record, onResendInvite, onViewAdapters, onViewRoutes }) => {
  if (record.deleted) return false;
  return (
    <DataTable.Row onTouchTap={onViewAdapters}>
      <DataTable.RowColumn style={{ width: '20rem' }}>
        {record.body.username}
      </DataTable.RowColumn>
      <DataTable.RowColumn>
        {record.body.email}
      </DataTable.RowColumn>
      <DataTable.RowColumn actions>
        <ActionsMenu
          isRegistered={Boolean(record.body.username)}
          onResendInvite={onResendInvite}
          onViewAdapters={onViewAdapters}
          onViewRoutes={onViewRoutes}
        />
      </DataTable.RowColumn>
    </DataTable.Row>
  );
};

UsersTableRow.propTypes = {
  onResendInvite: PropTypes.func.isRequired,
  onViewAdapters: PropTypes.func.isRequired,
  onViewRoutes: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
};

const container = withRecord({ fetchEvents: false });

export default container(UsersTableRow);
