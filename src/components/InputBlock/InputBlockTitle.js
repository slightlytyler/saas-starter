import cx from 'classnames';
import MaterialIcon from 'components/MaterialIcon';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import React, { PropTypes } from 'react';

const InputBlockTitle = ({ className, icon, onTouchTap, text }) => (
  <Toolbar
    className={cx('InputBlockTitle', className)}
    onTouchTap={onTouchTap}
  >
    <ToolbarGroup>
      <MaterialIcon
        color="currentColor"
        hoverColor="currentColor"
        style={{
          cursor: 'default',
          paddingLeft: 0,
          paddingRight: '24px',
        }}
      >
        {icon}
      </MaterialIcon>
      <ToolbarTitle
        style={{
          color: 'currentColor',
          transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        }}
        text={text}
      />
    </ToolbarGroup>
  </Toolbar>
);

InputBlockTitle.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

InputBlockTitle.defaultProps = {
  className: undefined,
};

export default InputBlockTitle;
