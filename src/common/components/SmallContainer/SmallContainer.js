import cx from 'classnames';
import React, { PropTypes } from 'react';
import { Container } from 'react-layout-components';

const SmallContainer = ({ children, className, ...props }) => (
  <Container
    {...props}
    className={cx('SmallContainer', className)}
    width="30em"
  >
    {children}
  </Container>
);

SmallContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SmallContainer.defaultProps = {
  className: undefined,
};

export default SmallContainer;
