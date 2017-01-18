import connect from 'common/redux/connect';

const withRecord = selector => connect({
  mapStateToProps: {
    record: (state, { id }) => selector(state, id),
  },
});

export default withRecord;
