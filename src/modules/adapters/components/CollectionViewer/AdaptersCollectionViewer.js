import selectQueryFromMatch from 'common/selectors/selectQueryFromMatch';
import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import withCollection from '../../containers/withCollection';

const AdaptersCollectionViewer = compose(
  withCollection(),
  mapProps(({ collection, match }) => ({
    ids: get('ids', collection),
    loading: get('loading', collection),
    query: selectQueryFromMatch(match),
  })),
)(Table);

export default AdaptersCollectionViewer;
