import React, { PropTypes } from 'react';

const AppLayoutContent = ({ children }) => (
  <div className="AppLayoutContent">
    {children}
  </div>
);

AppLayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayoutContent;
