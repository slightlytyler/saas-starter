import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import withCollection from '../../containers/withCollection';

const AdaptersCollectionViewer = compose(
  withCollection(),
  mapProps(props => ({
    ids: get('ids', props.collection),
    loading: get('loading', props.collection),
  })),
)(Table);

export default AdaptersCollectionViewer;
