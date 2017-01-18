import { get, isPlainObject } from 'lodash/fp';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const defaultMapDispatchToProps = () => ({});

const defaultMergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
  {},
  ownProps,
  stateProps,
  { actions: Object.assign({}, dispatchProps, get('actions', ownProps)) },
);

const selectMapStateToProps = mapStateToProps => {
  if (isPlainObject(mapStateToProps)) {
    return createStructuredSelector(mapStateToProps);
  }
  return mapStateToProps;
};

const customConnect = ({
  mapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps,
  mergeProps = defaultMergeProps,
}) => connect(
  selectMapStateToProps(mapStateToProps),
  mapDispatchToProps,
  mergeProps,
);

export default customConnect;
