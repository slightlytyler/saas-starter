import connect from 'common/redux/connect';
import { compose, get, head, size } from 'lodash/fp';
import { Snackbar } from 'material-ui';
import React, { PropTypes } from 'react';
import { lifecycle, withState } from 'recompose';
import * as actions from '../../actions';
import { selectSubstate } from '../../selectors';

const ToastsRoot = ({ currentToast, setCurrentToast }) => (
  <Snackbar
    autoHideDuration={3000}
    message={get('message', currentToast.record) || ''}
    onRequestClose={() => {
      setCurrentToast({
        open: false,
        record: currentToast.record,
      });
      setTimeout(
        () => setCurrentToast({
          open: false,
          record: null,
        }),
        500,
      );
    }}
    open={currentToast.open}
  />
);

ToastsRoot.propTypes = {
  currentToast: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    record: PropTypes.object,
  }).isRequired,
  setCurrentToast: PropTypes.func.isRequired,
};

const container = compose(
  connect({
    mapStateToProps: { pendingToasts: selectSubstate },
    mapDispatchToProps: { takeToast: actions.take },
  }),
  withState('currentToast', 'setCurrentToast', { open: false, record: null }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!nextProps.currentToast.record && size(nextProps.pendingToasts)) {
        this.props.setCurrentToast({
          open: true,
          record: head(nextProps.pendingToasts),
        });
        this.props.takeToast();
      }
    },
  }),
);

export default container(ToastsRoot);
