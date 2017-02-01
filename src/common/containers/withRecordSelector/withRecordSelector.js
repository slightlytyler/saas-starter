import connect from 'common/containers/connect';

const withRecordSelector = ({ selectId, selectRecordById }) => connect({
  mapStateToProps: { record: (state, props) => selectRecordById(state, selectId(props)) },
});

export default withRecordSelector;
