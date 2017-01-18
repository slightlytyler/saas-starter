import CreateButton from 'components/CreateButton';
import {
  DataTable,
  DataTableHeader,
  DataTableHeaderColumn,
  DataTableBody,
} from 'components/DataTable';
import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './AdaptersTableRow';

const renderRow = id => <Row id={id} key={id} />;

const renderRows = map(renderRow);

const transitionToCreator = () => push('/adapters/new');

const AdaptersTable = ({ ids, loading, onCreate }) => (
  <DataTable loading={!ids || loading}>
    <DataTableHeader>
      <DataTableHeaderColumn icon>
        Enabled
      </DataTableHeaderColumn>
      <DataTableHeaderColumn icon>
        Global
      </DataTableHeaderColumn>
      <DataTableHeaderColumn>
        Name
      </DataTableHeaderColumn>
      <DataTableHeaderColumn>
        Status
      </DataTableHeaderColumn>
      <DataTableHeaderColumn actions>
        <CreateButton onTouchTap={onCreate} />
      </DataTableHeaderColumn>
    </DataTableHeader>
    <DataTableBody>
      {renderRows(ids)}
    </DataTableBody>
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
