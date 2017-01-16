import ActionsProvider from 'components/ActionsProvider';
import CreateButton from 'components/CreateButton';
import {
  DataTable,
  DataTableHeader,
  DataTableHeaderColumn,
  DataTableBody,
} from 'components/DataTable';
import { push } from 'connected-react-router';
import { map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import Row from './AdaptersTableRow';

const renderRow = id => <Row id={id} key={id} />;

const renderRows = map(renderRow);

const transitionToCreator = () => push('/adapters/new');

const AdaptersTable = ({ ids, loading }) => {
  if (!size(ids) && loading) return <div>Loading...</div>;
  return (
    <DataTable loading={loading}>
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
};

AdaptersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AdaptersTable;