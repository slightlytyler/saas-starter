import withActions from 'containers/withActions';
import { FlatButton } from 'material-ui';
import React, { PropTypes } from 'react';
import Item from '../Item';
import * as actions from '../../actions';

const DialogsPrompt = ({ confirm, deny, ...props }) => (
  <Item
    actions={[
      <FlatButton
        label="Deny"
        onTouchTap={deny}
      />,
      <FlatButton
        keyboardFocused
        label="Confirm"
        onTouchTap={confirm}
        primary
      />,
    ]}
    modal
    {...props}
  />
);

DialogsPrompt.propTypes = {
  confirm: PropTypes.func.isRequired,
  deny: PropTypes.func.isRequired,
};

const container = withActions(props => ({
  confirm: () => actions.prompt.confirm({ id: props.id }),
  deny: () => actions.prompt.deny({ id: props.id }),
}));

export default container(DialogsPrompt);
