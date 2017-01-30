import { Dialog } from 'material-ui';
import React, { PropTypes } from 'react';

const DialogsItem = ({ actions, children, modal, open, style, title }) => (
  <Dialog
    actions={actions}
    modal={modal}
    open={open}
    style={{ zIndex: 10000, ...style }}
    title={title}
  >
    {children}
  </Dialog>
);

DialogsItem.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.element).isRequired,
  children: PropTypes.node.isRequired,
  modal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
};

DialogsItem.defaultProps = {
  modal: false,
  style: {},
};

export default DialogsItem;
