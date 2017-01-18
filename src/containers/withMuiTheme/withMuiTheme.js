import { getMuiTheme } from 'material-ui/styles';
import { PropTypes } from 'react';
import { withContext } from 'recompose';

const withMuiTheme = (muiTheme = getMuiTheme()) => withContext(
  { muiTheme: PropTypes.object.isRequired },
  () => ({ muiTheme }),
);

export default withMuiTheme;
