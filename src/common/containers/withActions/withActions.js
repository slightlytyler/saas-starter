import connect from 'common/containers/connect';
import { isFunction } from 'lodash/fp';
import { bindActionCreators } from 'redux';

const withActions = creators => {
  if (isFunction(creators)) {
    return connect({
      mapDispatchToProps: (dispatch, props) => () => bindActionCreators(
        creators(props),
        dispatch,
      ),
    });
  }
  return connect({ mapDispatchToProps: creators });
};

export default withActions;
