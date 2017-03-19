import { isPlainObject } from 'lodash/fp';
import { connect as baseConnect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const defaultMapDispatchToProps = () => ({});

const selectMapStateToProps = mapStateToProps => {
  if (isPlainObject(mapStateToProps)) {
    return createStructuredSelector(mapStateToProps);
  }
  return mapStateToProps;
};

const connect = (
  {
    mapStateToProps,
    mapDispatchToProps = defaultMapDispatchToProps,
    mergeProps,
  },
) =>
  baseConnect(
    selectMapStateToProps(mapStateToProps),
    mapDispatchToProps,
    mergeProps,
  );

export default connect;
