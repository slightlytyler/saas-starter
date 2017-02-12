import moment from 'moment';
import React, { PropTypes } from 'react';

const Timestamp = ({ children, style, ...props }) => (
  <div
    {...props}
    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '12px', ...style }}
  >
    {moment(children).fromNow()}
  </div>
);

Timestamp.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Timestamp.defaultProps = {
  style: {},
};

export default Timestamp;
