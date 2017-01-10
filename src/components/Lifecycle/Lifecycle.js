import { Component, PropTypes } from 'react';
import { compose } from 'lodash/fp';
import attempt from 'helpers/function/attempt';

export default class Lifecycle extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    componentDidMount: PropTypes.func,
    componentDidUpdate: PropTypes.func,
    componentWillMount: PropTypes.func,
    componentWillReceiveProps: PropTypes.func,
    componentWillUnmount: PropTypes.func,
    componentWillUpdate: PropTypes.func,
    props: PropTypes.object.isRequired,
    shouldComponentUpdate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    if (props.shouldComponentUpdate) {
      this.shouldComponentUpdate = nextProps => compose(
        attempt(nextProps.props),
        attempt(this.props.props)
      )(this.props.shouldComponentUpdate);
    }
  }

  componentWillMount = () => compose(
    attempt(),
    attempt(this.props.props)
  )(this.props.componentWillMount);

  componentDidMount = () => compose(
    attempt(),
    attempt(this.props.props)
  )(this.props.componentDidMount);

  componentWillReceiveProps = nextProps => compose(
    attempt(nextProps.props),
    attempt(this.props.props)
  )(this.props.componentWillReceiveProps);

  componentWillUpdate = nextProps => compose(
    attempt(nextProps.props),
    attempt(this.props.props)
  )(this.props.componentWillUpdate);

  componentDidUpdate = () => compose(
    attempt(),
    attempt(this.props.props)
  )(this.props.componentDidUpdate);

  componentWillUnmount = compose(
    attempt(),
    attempt(this.props.props)
  )(this.props.componentWillUnmount);

  render = () => this.props.children;
}
