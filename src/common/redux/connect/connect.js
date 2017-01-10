import { connect } from 'react-redux';

const defaultMergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  { actions: dispatchProps },
);

export default (mapStateToProps, mapDispatchToProps, mergeProps = defaultMergeProps) => connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
);
