import cx from 'classnames';
import { identity } from 'lodash/fp';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Body from './InputBlockBody';
import Title from './InputBlockTitle';

const InputBlock = ({ children, className, expand, icon, onExpand, title }) => (
  <Paper className={cx('InputBlock', className)}>
    <Box column>
      <Title icon={icon} onTouchTap={() => onExpand(!expand)} text={title} />
      <Body expand={expand}>
        {children}
      </Body>
    </Box>
  </Paper>
);

InputBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  expand: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  onExpand: PropTypes.func,
  title: PropTypes.string.isRequired,
};

InputBlock.defaultProps = {
  className: undefined,
  expand: undefined,
  onExpand: identity,
};

export default InputBlock;
