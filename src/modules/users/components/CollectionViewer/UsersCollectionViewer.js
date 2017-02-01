import withActions from 'common/containers/withActions';
import { compose, get } from 'lodash/fp';
import { mapProps } from 'recompose';
import Table from '../Table';
import * as actions from '../../actions';
import withCollection from '../../containers/withCollection';

const container = compose(
  withActions({ onResendInvite: actions.resendInvite }),
  withCollection(),
  mapProps(props => ({
    ids: get('ids', props.collection) || [],
    loading: get('loading', props.collection) || !props.collection,
    onResendInvite: id => props.onResendInvite({ id }),
    onSendInvite: () => props.push(`${props.match.url}/invite`),
    onViewAdapters: () => {},
    onViewRoutes: () => {},
  })),
);

export default container(Table);
