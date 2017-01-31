import connect from 'common/redux/connect';
import { compose, omit } from 'lodash/fp';
import { lifecycle, mapProps } from 'recompose';

const withRecordFetcher = (fetchCollection, selectQuery) => compose(
  connect({
    mapDispatchToProps: { fetchCollection },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchCollection({ query: selectQuery(this.props) });
    },
    componentWillReceiveProps(nextProps) {
      if (selectQuery(this.props) !== selectQuery(nextProps)) {
        this.props.fetchCollection({ query: selectQuery(nextProps) });
      }
    },
  }),
  mapProps(omit('fetchCollection')),
);

export default withRecordFetcher;
