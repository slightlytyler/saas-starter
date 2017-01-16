import connect from 'common/redux/connect';
import Lifecycle from 'components/Lifecycle';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';

const CollectionFetcher = ({ actions, children, query }) => (
  <Lifecycle
    componentDidMount={() => () => actions.fetchCollection({ query })}
    componentWillReceiveProps={props => nextProps => {
      if (props.query !== nextProps.query) {
        actions.fetchCollection({ query: nextProps.query });
      }
    }}
  >
    {children}
  </Lifecycle>
);

CollectionFetcher.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  action: PropTypes.func.isRequired,
  actions: PropTypes.shape({
    fetchCollection: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  query: PropTypes.object.isRequired,
};

const container = connect(
  null,
  (dispatch, { action }) => () => bindActionCreators({
    fetchCollection: action,
  }, dispatch),
);

export { CollectionFetcher as component, container };

export default container(CollectionFetcher);
