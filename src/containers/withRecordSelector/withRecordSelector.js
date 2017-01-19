import connect from 'common/redux/connect';

const withRecordSelector = selector => connect({
  mapStateToProps: {
    record: (state, { id }) => selector(state, id),
  },
});

export default withRecordSelector;
