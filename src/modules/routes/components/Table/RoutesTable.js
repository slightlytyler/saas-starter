import CreateButton from 'common/components/CreateButton';
import DataTable from 'common/components/DataTable';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './RoutesTableRow';

const RoutesTable = ({ ids, loading, onCreate, onDelete, onEdit }) => (
  <DataTable loading={loading}>
    <DataTable.Header>
      <DataTable.HeaderColumn icon>
        Enabled
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn style={{ width: '20rem' }}>
        Name
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn>
        Status
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn actions>
        <CreateButton onTouchTap={onCreate} />
      </DataTable.HeaderColumn>
    </DataTable.Header>
    <DataTable.Body>
      {map(
        id => (
          <Row
            id={id}
            key={id}
            onDelete={() => onDelete(id)}
            onEdit={() => onEdit(id)}
          />
        ),
        ids,
      )}
    </DataTable.Body>
  </DataTable>
);

RoutesTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default RoutesTable;
