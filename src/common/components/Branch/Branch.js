import { PropTypes } from 'react';

const Branch = props => (props.condition ? props.leftRender() : props.rightRender());

Branch.propTypes = {
  condition: PropTypes.bool.isRequired,
  leftRender: PropTypes.func,
  rightRender: PropTypes.func,
};

Branch.defaultProps = {
  leftRender: () => null,
  rightRender: () => null,
};

export default Branch;
