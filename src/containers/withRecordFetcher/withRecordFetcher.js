import connect from 'common/redux/connect';
import { compose, indexOf, omit } from 'lodash/fp';
import { lifecycle, mapProps } from 'recompose';

const withRecordFetcher = ({ fetchEvents, fetchRecord, newKey, selectId }) => compose(
  connect({ mapDispatchToProps: { fetchRecord } }),
  lifecycle({
    componentDidMount() {
      if (indexOf('mount', fetchEvents) !== -1) {
        const id = selectId(this.props);
        if (id !== newKey) this.props.fetchRecord({ id });
      }
    },
    componentWillReceiveProps(nextProps) {
      if (indexOf('update', fetchEvents) !== -1) {
        if (selectId(this.props) !== selectId(nextProps)) {
          const id = selectId(nextProps);
          if (id !== newKey) this.props.fetchRecord({ id });
        }
      }
    },
  }),
  mapProps(omit('fetchRecord')),
);

export default withRecordFetcher;
