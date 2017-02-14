import { compose, get } from 'lodash/fp';
import { TextField } from 'material-ui';
import CurrentUserAvatar from 'modules/auth/components/CurrentUserAvatar';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { withProps, withState } from 'recompose';
import generateId from 'shortid';

const CommentCreator = props => (
  <Box alignItems="center">
    <CurrentUserAvatar size={30} style={{ marginRight: '16px' }} />
    <TextField
      fullWidth
      id={props.id}
      onChange={compose(props.onChange, get('target.value'))}
      onKeyPress={e => {
        if (e.which === 13 && props.value) {
          props.onSubmit(props.value);
          props.onChange('');
        }
      }}
      value={props.value}
    />
  </Box>
);

CommentCreator.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const container = compose(
  withProps({ id: generateId() }),
  withState('value', 'onChange', ''),
);

export default container(CommentCreator);
