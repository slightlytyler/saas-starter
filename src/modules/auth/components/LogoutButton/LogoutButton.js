import { RaisedButton } from 'material-ui';
import { withProps } from 'recompose';
import { clearToken } from '../../helpers';

const container = withProps({
  label: 'Logout',
  onTouchTap: () => {
    clearToken();
    location.reload();
  },
});

export default container(RaisedButton);
