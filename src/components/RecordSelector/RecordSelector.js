import connect from 'common/redux/connect';
import { get } from 'lodash/fp';
import { PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';

const RecordSelector = ({ children, record }) => (get('deleted', record) ? false : children({ record }));

RecordSelector.propTypes = {
  children: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.string.isRequired,
  record: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  selector: PropTypes.func.isRequired,
};

RecordSelector.defaultProps = {
  record: null,
};

const container = connect({
  mapStateToProps: createStructuredSelector({
    record: (state, { id, selector }) => selector(state, id),
  }),
});

export { RecordSelector as component, container };

export default container(RecordSelector);
