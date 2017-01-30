import connect from 'common/redux/connect';
import { compose, omit } from 'lodash/fp';
import { lifecycle, mapProps } from 'recompose';

const withRecordFetcher = (action, selectId) => compose(
  connect({
    mapDispatchToProps: { fetchRecord: action },
  }),
  lifecycle({
    componentDidMount() {
      const id = selectId(this.props);
      if (id !== 'new') this.props.fetchRecord({ id });
    },
    componentWillReceiveProps(nextProps) {
      if (selectId(this.props) !== selectId(nextProps)) {
        const id = selectId(nextProps);
        if (id !== 'new') this.props.fetchRecord({ id });
      }
    },
  }),
  mapProps(omit('fetchRecord')),
);

export default withRecordFetcher;
