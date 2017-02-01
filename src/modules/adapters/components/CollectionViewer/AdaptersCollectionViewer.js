import withActions from 'common/containers/withActions';
import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import * as actions from '../../actions';
import withCollection from '../../containers/withCollection';

const container = compose(
  withActions({ onDelete: actions.deleteRecord }),
  withCollection(),
  mapProps(props => ({
    ids: get('ids', props.collection) || [],
    loading: get('loading', props.collection) || !props.collection,
    onCreate: () => props.push(`${props.match.url}/new`),
    onDelete: id => props.onDelete({ id }),
    onEdit: id => props.push(`${props.match.url}/${id}`),
  })),
);

export default container(Table);
