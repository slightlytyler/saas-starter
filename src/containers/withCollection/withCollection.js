import connect from 'common/redux/connect';

const withCollection = selector => connect({
  mapStateToProps: {
    collection: (state, { query }) => selector(state, query),
  },
});

export default withCollection;
