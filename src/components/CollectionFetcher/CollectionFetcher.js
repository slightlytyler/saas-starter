import connect from 'common/redux/connect';
import Lifecycle from 'components/Lifecycle';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

const CollectionFetcher = ({ actions, children, collection, query }) => (
  <Lifecycle
    componentDidMount={() => () => actions.fetchCollection({ query })}
    componentWillReceiveProps={props => nextProps => {
      if (props.query !== nextProps.query) {
        actions.fetchCollection({ query: nextProps.query });
      }
    }}
  >
    {children({ collection })}
  </Lifecycle>
);

CollectionFetcher.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  action: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    fetchCollection: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  collection: PropTypes.shape({
    ids: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
  }),
  query: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  selector: PropTypes.func.isRequired,
};

CollectionFetcher.defaultProps = {
  collection: {
    ids: [],
    loading: true,
    placeholder: true,
  },
  query: PropTypes.object,
};

const container = connect(
  createStructuredSelector({
    collection: (state, { query, selector }) => selector(state, query),
  }),
  (dispatch, { action }) => () => bindActionCreators({
    fetchCollection: action,
  }, dispatch),
);

export { CollectionFetcher as component, container };

export default container(CollectionFetcher);
