import attempt from 'common/functions/attempt';
import { compose } from 'lodash/fp';
import { Component, PropTypes } from 'react';

export default class Lifecycle extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    componentDidMount: PropTypes.func,
    componentDidUpdate: PropTypes.func,
    componentWillMount: PropTypes.func,
    componentWillReceiveProps: PropTypes.func,
    componentWillUnmount: PropTypes.func,
    componentWillUpdate: PropTypes.func,
    props: PropTypes.object,
    shouldComponentUpdate: PropTypes.func,
  };

  static defaultProps = {
    componentDidMount: undefined,
    componentDidUpdate: undefined,
    componentWillMount: undefined,
    componentWillReceiveProps: undefined,
    componentWillUnmount: undefined,
    componentWillUpdate: undefined,
    props: {},
    shouldComponentUpdate: undefined,
  };

  constructor(props) {
    super(props);
    if (props.shouldComponentUpdate) {
      this.shouldComponentUpdate = nextProps => compose(
        attempt(nextProps.props),
        attempt(this.props.props),
      )(this.props.shouldComponentUpdate);
    }
  }

  componentWillMount = () => compose(
    attempt(),
    attempt(this.props.props),
  )(this.props.componentWillMount);

  componentDidMount = () => compose(
    attempt(),
    attempt(this.props.props),
  )(this.props.componentDidMount);

  componentWillReceiveProps = nextProps => compose(
    attempt(nextProps.props),
    attempt(this.props.props),
  )(this.props.componentWillReceiveProps);

  componentWillUpdate = nextProps => compose(
    attempt(nextProps.props),
    attempt(this.props.props),
  )(this.props.componentWillUpdate);

  componentDidUpdate = () => compose(
    attempt(),
    attempt(this.props.props),
  )(this.props.componentDidUpdate);

  componentWillUnmount = compose(
    attempt(),
    attempt(this.props.props),
  )(this.props.componentWillUnmount);

  render = () => this.props.children;
}
