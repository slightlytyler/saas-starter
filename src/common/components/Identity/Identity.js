import { PropTypes } from 'react';

const Identity = ({ children }) => children;

Identity.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Identity;
