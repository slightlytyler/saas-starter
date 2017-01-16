import connect from 'common/redux/connect';
import Lifecycle from 'components/Lifecycle';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';

const RecordFetcher = ({ actions, children, id }) => (
  <Lifecycle
    componentDidMount={() => () => actions.fetchRecord({ id })}
    componentWillReceiveProps={props => nextProps => {
      if (props.id !== nextProps.id) {
        actions.fetchRecord({ id: nextProps.id });
      }
    }}
  >
    {children}
  </Lifecycle>
);

RecordFetcher.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  action: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    fetchRecord: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};

const container = connect(
  null,
  (dispatch, { action }) => () => bindActionCreators({
    fetchRecord: action,
  }, dispatch),
);

export { RecordFetcher as component, container };

export default container(RecordFetcher);
