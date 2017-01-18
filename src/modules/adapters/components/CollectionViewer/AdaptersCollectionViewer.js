import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import withCollection from '../../containers/withCollection';
import withCollectionFetcher from '../../containers/withCollectionFetcher';

export default compose(
  withCollectionFetcher,
  withCollection,
  mapProps(({ collection }) => ({
    ids: get('ids', collection),
    loading: get('loading', collection),
  })),
)(Table);
