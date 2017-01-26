import connect from 'common/redux/connect';

const withRecordSelector = (selector, idSelector) => connect({
  mapStateToProps: {
    record: (state, props) => selector(state, idSelector(props)),
  },
});

export default withRecordSelector;
