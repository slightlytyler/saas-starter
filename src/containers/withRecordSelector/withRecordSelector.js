import connect from 'common/redux/connect';

const withRecordSelector = (selector, selectId) => connect({
  mapStateToProps: {
    record: (state, props) => selector(state, selectId(props)),
  },
});

export default withRecordSelector;
