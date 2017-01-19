import CreateButton from 'components/CreateButton';
import DataTable from 'components/DataTable';
import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import { map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './AdaptersTableRow';

const renderRow = id => <Row id={id} key={id} />;

const renderRows = map(renderRow);

const transitionToCreator = () => push('/adapters/new');

const AdaptersTable = ({ ids, loading, onCreate }) => (
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
      {renderRows(ids)}
    </DataTable.Body>
  </DataTable>
);

AdaptersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onCreate: PropTypes.func.isRequired,
};

AdaptersTable.defaultProps = {
  ids: null,
  loading: false,
};

const container = withActions({ onCreate: transitionToCreator });

export { AdaptersTable as component, container };

export default container(AdaptersTable);
