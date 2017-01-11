import { Component, PropTypes } from 'react';

export default class StateProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object,
  };

  static defaultProps = {
    initialState: {},
  };

  state = this.props.initialState;

  render = () => this.props.children({
    setState: this.setState.bind(this),
    state: this.state,
  });
}
