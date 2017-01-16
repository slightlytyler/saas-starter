import { PropTypes } from 'react';
import connect from 'common/redux/connect';
import { createStructuredSelector } from 'reselect';

const CollectionSelector = ({ children, collection }) => children({ collection });

CollectionSelector.propTypes = {
  children: PropTypes.func.isRequired,
  collection: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  query: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  selector: PropTypes.func.isRequired,
};

CollectionSelector.defaultProps = {
  collection: {
    ids: [],
    loading: true,
    placeholder: true,
  },
};

const container = connect(
  createStructuredSelector({
    collection: (state, { query, selector }) => selector(state, query),
  }),
);

export { CollectionSelector as component, container };

export default container(CollectionSelector);
