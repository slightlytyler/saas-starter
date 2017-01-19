import connect from 'common/redux/connect';

const withCollectionSelector = selector => connect({
  mapStateToProps: {
    collection: (state, { query }) => selector(state, query),
  },
});

export default withCollectionSelector;
