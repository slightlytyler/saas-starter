import { compose } from 'lodash/fp';
import { PropTypes } from 'react';
import { getContext, lifecycle } from 'recompose';

const withModuleInit = initFn => compose(
  getContext({ store: PropTypes.object.isRequired }),
  lifecycle({
    componentWillMount() {
      initFn(this.props.store);
    },
  }),
);

export default withModuleInit;
