import CreateButton from 'common/components/CreateButton';
import DataTable from 'common/components/DataTable';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './UsersTableRow';

const UsersTable = ({
  ids,
  loading,
  onResendInvite,
  onSendInvite,
  onViewAdapters,
  onViewRoutes,
}) => (
  <DataTable loading={loading}>
    <DataTable.Header>
      <DataTable.HeaderColumn>
        Username
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn>
        Email
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn actions>
        <CreateButton onTouchTap={onSendInvite} />
      </DataTable.HeaderColumn>
    </DataTable.Header>
    <DataTable.Body>
      {map(
        id => (
          <Row
            id={id}
            key={id}
            onResendInvite={onResendInvite}
            onViewAdapters={onViewAdapters}
            onViewRoutes={onViewRoutes}
          />
        ),
        ids,
      )}
    </DataTable.Body>
  </DataTable>
);

UsersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  onResendInvite: PropTypes.func.isRequired,
  onSendInvite: PropTypes.func.isRequired,
  onViewAdapters: PropTypes.func.isRequired,
  onViewRoutes: PropTypes.func.isRequired,
};

export default UsersTable;
