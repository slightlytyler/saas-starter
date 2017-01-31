import connect from 'common/redux/connect';

const withRecordSelector = ({ selectId, selectRecordById }) => connect({
  mapStateToProps: { record: (state, props) => selectRecordById(state, selectId(props)) },
});

export default withRecordSelector;
