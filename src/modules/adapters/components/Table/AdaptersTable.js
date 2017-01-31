import CreateButton from 'components/CreateButton';
import DataTable from 'components/DataTable';
import { map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './AdaptersTableRow';

const AdaptersTable = ({ ids, loading, onCreate, onEdit }) => (
  <DataTable loading={loading && !size(ids)}>
    <DataTable.Header>
      <DataTable.HeaderColumn icon>
        Enabled
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn icon>
        Global
      </DataTable.HeaderColumn>
      <DataTable.HeaderColumn>
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
      {map(id => <Row id={id} key={id} onEdit={onEdit} />, ids)}
    </DataTable.Body>
  </DataTable>
);

AdaptersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

AdaptersTable.defaultProps = {
  ids: null,
  loading: false,
};

export default AdaptersTable;
