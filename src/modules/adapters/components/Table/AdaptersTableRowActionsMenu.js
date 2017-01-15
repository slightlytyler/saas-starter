import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import ActionsProvider from 'components/ActionsProvider';
import { push } from 'connected-react-router';
import React, { PropTypes } from 'react';
import { deleteRecord } from '../../actions';

const selectCreators = id => ({
  deleteRecord: () => deleteRecord({ id }),
  transitionToEditor: () => push(`/adapters/${id}/edit`),
  transitionToViewer: () => push(`/adapters/${id}`),
});

const selectMenuItems = actions => ([
  {
    action: actions.transitionToViewer,
    id: 'view',
    label: 'View',
  },
  {
    action: actions.transitionToEditor,
    id: 'edit',
    label: 'Edit',
  },
  {
    action: actions.deleteRecord,
    id: 'delete',
    label: 'Delete',
    style: { color: colors.red50 },
  },
]);

const AdaptersTableRowActionsMenu = ({ id }) => (
  <ActionsProvider creators={selectCreators(id)}>
    {({ actions }) => <ActionsMenu items={selectMenuItems(actions)} />}
  </ActionsProvider>
);

AdaptersTableRowActionsMenu.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AdaptersTableRowActionsMenu;
