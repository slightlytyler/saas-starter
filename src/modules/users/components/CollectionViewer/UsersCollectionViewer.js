import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import withCollection from '../../containers/withCollection';

const UsersCollectionViewer = compose(
  withCollection(),
  mapProps(props => ({
    ids: get('ids', props.collection),
    loading: get('loading', props.collection),
    onCreate: () => props.push(`${props.match.url}/invite`),
  })),
)(Table);

export default UsersCollectionViewer;
