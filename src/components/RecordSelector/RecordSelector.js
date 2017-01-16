import { PropTypes } from 'react';
import connect from 'common/redux/connect';
import { createStructuredSelector } from 'reselect';

const RecordSelector = ({ children, record }) => children({ record });

RecordSelector.propTypes = {
  children: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.string.isRequired,
  record: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  selector: PropTypes.func.isRequired,
};

RecordSelector.defaultProps = {
  record: {
    body: {},
    loading: true,
    placeholder: true,
  },
};

const container = connect(
  createStructuredSelector({
    record: (state, { id, selector }) => selector(state, id),
  }),
);

export { RecordSelector as component, container };

export default container(RecordSelector);
