import colors from 'colors';
import withCurrentUser from 'modules/auth/containers/withCurrentUser';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Creator from '../Creator';
import List from '../List';

const CommentsRoot = props => (
  <Box column style={{ backgroundColor: colors.white4, padding: '16px' }}>
    {props.currentUser && <Creator parentPostId={props.parentPostId} />}
    <List records={props.records} />
  </Box>
);

CommentsRoot.propTypes = {
  currentUser: PropTypes.object,
  parentPostId: PropTypes.string.isRequired,
  records: PropTypes.array.isRequired,
};

CommentsRoot.defaultProps = {
  currentUser: null,
};

const container = withCurrentUser;

export default container(CommentsRoot);
