import MultiLineText from 'common/components/MultiLineText';
import Timestamp from 'common/components/Timestamp';
import UsersAvatar from 'modules/users/components/Avatar';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';

const CommentsItem = props => (
  <Box style={{ marginTop: '12px' }}>
    <UsersAvatar
      size={30}
      style={{ marginRight: '16px' }}
      user={props.record.author}
    />
    <Box column>
      <Box style={{ fontSize: '14px' }}>
        <span>{props.record.author.name}</span>&nbsp;
        <MultiLineText>{props.record.body}</MultiLineText>
      </Box>
      <Box>
        <Timestamp>{props.record.createdAt}</Timestamp>
      </Box>
    </Box>
  </Box>
);

CommentsItem.propTypes = {
  record: PropTypes.shape({
    author: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsItem;
