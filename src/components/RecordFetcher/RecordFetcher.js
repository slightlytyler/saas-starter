import connect from 'common/redux/connect';
import Lifecycle from 'components/Lifecycle';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

const RecordFetcher = ({ actions, children, id, record }) => (
  <Lifecycle
    componentDidMount={() => () => actions.fetchRecord({ id })}
    componentWillReceiveProps={props => nextProps => {
      if (props.id !== nextProps.id) {
        actions.fetchRecord({ id: nextProps.id });
      }
    }}
  >
    {children({ record })}
  </Lifecycle>
);

RecordFetcher.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  action: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    fetchRecord: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  record: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  selector: PropTypes.func.isRequired,
};

RecordFetcher.defaultProps = {
  record: {
    body: {},
    loading: true,
  },
};

const container = connect(
  createStructuredSelector({
    record: (state, { id, selector }) => selector(state, id),
  }),
  (dispatch, { action }) => () => bindActionCreators({
    fetchRecord: action,
  }, dispatch),
);

export { RecordFetcher as component, container };

export default container(RecordFetcher);
