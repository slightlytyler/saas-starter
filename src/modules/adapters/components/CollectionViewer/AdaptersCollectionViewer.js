import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import withCollection from '../../containers/withCollection';

const AdaptersCollectionViewer = compose(
  withCollection(),
  mapProps(({ collection }) => ({
    ids: get('ids', collection),
    loading: get('loading', collection),
  })),
)(Table);

export default AdaptersCollectionViewer;
