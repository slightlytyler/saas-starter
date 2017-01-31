import CreateButton from 'common/components/CreateButton';
import DataTable from 'common/components/DataTable';
import { map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './UsersTableRow';

const UsersTable = ({ ids, loading, onCreate }) => (
  <DataTable loading={loading && !size(ids)}>
    <DataTable.Header>
      <DataTable.HeaderColumn>
        Username
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn>
        Email
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn actions>
        <CreateButton onTouchTap={onCreate} />
      </DataTable.HeaderColumn>
    </DataTable.Header>
    <DataTable.Body>
      {map(id => <Row id={id} key={id} />, ids)}
    </DataTable.Body>
  </DataTable>
);

UsersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
};

UsersTable.defaultProps = {
  ids: null,
  loading: false,
};

export default UsersTable;
