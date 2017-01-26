import CreateButton from 'components/CreateButton';
import DataTable from 'components/DataTable';
import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import { compose, map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { getContext } from 'recompose';
import Row from './AdaptersTableRow';

const renderRow = id => <Row id={id} key={id} />;

const AdaptersTable = ({ ids, loading, transitionToCreate }) => (
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
        <CreateButton onTouchTap={transitionToCreate} />
      </DataTable.HeaderColumn>
    </DataTable.Header>
    <DataTable.Body>
      {map(renderRow, ids)}
    </DataTable.Body>
  </DataTable>
);

AdaptersTable.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  transitionToCreate: PropTypes.func.isRequired,
};

AdaptersTable.defaultProps = {
  ids: null,
  loading: false,
};

export default compose(
  getContext({ rootUrl: PropTypes.string.isRequired }),
  withActions(props => ({ transitionToCreate: () => push(`${props.rootUrl}/new`) })),
)(AdaptersTable);
