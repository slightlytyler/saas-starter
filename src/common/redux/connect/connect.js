import { isPlainObject } from 'lodash/fp';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const defaultMapDispatchToProps = () => ({});

const selectMapStateToProps = mapStateToProps => {
  if (isPlainObject(mapStateToProps)) {
    return createStructuredSelector(mapStateToProps);
  }
  return mapStateToProps;
};

const customConnect = ({
  mapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps,
  mergeProps,
}) => connect(
  selectMapStateToProps(mapStateToProps),
  mapDispatchToProps,
  mergeProps,
);

export default customConnect;
