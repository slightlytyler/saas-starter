import connect from 'common/redux/connect';
import { compose } from 'lodash/fp';
import { lifecycle } from 'recompose';

const withRecordFetcher = action => compose(
  connect({
    mapDispatchToProps: { fetchRecord: action },
  }),
  lifecycle({
    componentDidMount() {
      this.props.actions.fetchRecord({ id: this.props.id });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.id !== nextProps.id) {
        this.props.actions.fetchRecord({ id: nextProps.id });
      }
    },
  }),
);

export default withRecordFetcher;
