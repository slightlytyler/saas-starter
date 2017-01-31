import cx from 'classnames';
import MaterialIcon from 'common/components/MaterialIcon';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import React, { PropTypes } from 'react';

const InputBlockTitle = ({ disabled, forceOpen, icon, onTouchTap, open, text }) => (
  <Toolbar
    className={cx(
      'InputBlockTitle',
      {
        disabled,
        'force-open': forceOpen,
        open,
      },
    )}
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
  disabled: PropTypes.bool.isRequired,
  forceOpen: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default InputBlockTitle;
