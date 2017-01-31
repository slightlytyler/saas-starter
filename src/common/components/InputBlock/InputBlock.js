import cx from 'classnames';
import { noop } from 'lodash/fp';
import { Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import Body from './InputBlockBody';
import Title from './InputBlockTitle';

const handleOpen = (open, onOpen) => () => onOpen(!open);

const InputBlock = ({
  children,
  className,
  disabled,
  forceOpen,
  icon,
  onOpen,
  open,
  title,
}) => (
  <Paper className={cx('InputBlock', className)}>
    <Box column>
      <Title
        disabled={disabled}
        forceOpen={forceOpen}
        icon={icon}
        onTouchTap={(disabled || forceOpen) ? noop : handleOpen(open, onOpen)}
        open={open}
        text={title}
      />
      <Body disabled={disabled} open={forceOpen || open}>
        {children}
      </Body>
    </Box>
  </Paper>
);

InputBlock.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  forceOpen: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

InputBlock.defaultProps = {
  className: undefined,
  disabled: false,
  forceOpen: false,
  onOpen: noop,
  open: true,
};

export default InputBlock;
