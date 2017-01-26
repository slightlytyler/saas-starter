import connect from 'common/redux/connect';
import { compose } from 'lodash/fp';
import { lifecycle } from 'recompose';

const withRecordFetcher = (action, idSelector) => compose(
  connect({
    mapDispatchToProps: { fetchRecord: action },
  }),
  lifecycle({
    componentDidMount() {
      const id = idSelector(this.props);
      if (id !== 'new') this.props.fetchRecord({ id });
    },
    componentWillReceiveProps(nextProps) {
      if (idSelector(this.props) !== idSelector(nextProps)) {
        const id = idSelector(nextProps);
        if (id !== 'new') this.props.fetchRecord({ id });
      }
    },
  }),
);

export default withRecordFetcher;
