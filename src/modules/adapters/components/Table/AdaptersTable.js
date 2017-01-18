import ActionsProvider from 'components/ActionsProvider';
import CreateButton from 'components/CreateButton';
import {
  DataTable,
  DataTableHeader,
  DataTableHeaderColumn,
  DataTableBody,
} from 'components/DataTable';
import { push } from 'connected-react-router';
import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './AdaptersTableRow';

const renderRow = id => <Row id={id} key={id} />;

const renderRows = map(renderRow);

const transitionToCreator = () => push('/adapters/new');

const AdaptersTable = ({ ids, loading }) => (
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
        <ActionsProvider creators={{ transitionToCreator }}>
          {({ actions }) => (
            <CreateButton onClick={actions.transitionToCreator} />
          )}
        </ActionsProvider>
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
};

AdaptersTable.defaultProps = {
  ids: null,
  loading: false,
};

export default AdaptersTable;
