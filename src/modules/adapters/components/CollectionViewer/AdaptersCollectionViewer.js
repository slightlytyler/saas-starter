import withActions from 'common/containers/withActions';
import { compose, get, size } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import * as actions from '../../actions';
import withCollection from '../../containers/withCollection';

const container = compose(
  withActions({ onDelete: actions.deleteRecord }),
  withCollection(),
  mapProps(props => {
    const ids = get('ids', props.collection) || [];
    return {
      ids,
      loading: (!size(ids) && get('loading', props.collection)) || !props.collection,
      onCreate: () => props.push(`${props.match.url}/new`),
      onDelete: id => props.onDelete({ id }),
      onEdit: id => props.push(`${props.match.url}/${id}/general`),
    };
  }),
);

export default container(Table);
