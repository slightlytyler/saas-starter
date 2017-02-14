import { PropTypes } from 'react';

const Branch = props => (props.condition ? props.renderLeft() : props.renderRight());

Branch.propTypes = {
  condition: PropTypes.bool.isRequired,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
};

Branch.defaultProps = {
  renderLeft: () => null,
  renderRight: () => null,
};

export default Branch;
