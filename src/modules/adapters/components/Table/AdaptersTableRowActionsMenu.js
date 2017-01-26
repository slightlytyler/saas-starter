import colors from 'colors';
import ActionsMenu from 'components/ActionsMenu';
import { push } from 'connected-react-router';
import withActions from 'containers/withActions';
import { compose } from 'lodash/fp';
import { PropTypes } from 'react';
import { getContext, mapProps } from 'recompose';
import * as actions from '../../actions';

export default compose(
  getContext({ rootUrl: PropTypes.string.isRequired }),
  withActions(props => ({
    deleteRecord: () => actions.deleteRecord({ id: props.id }),
    transitionToEdit: () => push(`${props.rootUrl}/${props.id}`),
  })),
  mapProps(props => ({
    items: [
      {
        action: props.transitionToEdit,
        id: 'edit',
        label: 'Edit Adapter',
      },
      {
        action: () => {},
        id: 'operations',
      },
      {
        action: props.deleteRecord,
        id: 'delete',
        label: 'Delete Adapter',
        style: { color: colors.red50 },
      },
    ],
  })),
)(ActionsMenu);
