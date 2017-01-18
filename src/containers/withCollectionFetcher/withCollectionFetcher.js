import connect from 'common/redux/connect';
import { compose } from 'lodash/fp';
import { lifecycle } from 'recompose';

const withRecordFetcher = action => compose(
  connect({
    mapDispatchToProps: { fetchCollection: action },
  }),
  lifecycle({
    componentDidMount() {
      this.props.actions.fetchCollection({ query: this.props.query });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.query !== nextProps.query) {
        this.props.actions.fetchCollection({ query: nextProps.query });
      }
    },
  }),
);

export default withRecordFetcher;
