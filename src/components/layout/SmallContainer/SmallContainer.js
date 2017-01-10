import cx from 'classnames';
import React, { PropTypes } from 'react';
import { Container } from 'react-layout-components';

const SmallContainer = ({ children, className }) => (
  <Container
    className={cx('SmallContainer', className)}
    margin="0 auto"
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
