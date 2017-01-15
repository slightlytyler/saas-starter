import { isPlainObject } from 'lodash/fp';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const defaultMergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  { actions: dispatchProps },
);

const selectMapStateToProps = mapStateToProps => {
  if (isPlainObject(mapStateToProps)) {
    return createStructuredSelector(mapStateToProps);
  }
  return mapStateToProps;
};

export default (mapStateToProps, mapDispatchToProps, mergeProps = defaultMergeProps) => connect(
  selectMapStateToProps(mapStateToProps),
  mapDispatchToProps,
  mergeProps,
);
