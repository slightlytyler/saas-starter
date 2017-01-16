import createElementResizeDetector from 'element-resize-detector';
import { bind, compose, invoke, mapValues, pick } from 'lodash/fp';
import { Component, PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { findDOMNode } from 'react-dom';

const erd = createElementResizeDetector();

export default class AutoSizer extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    height: 0,
    width: 0,
  };

  componentDidMount = () => {
    this.parentNode = findDOMNode(this).parentNode;
    this.setDimensions(this.parentNode);
    erd.listenTo(this.parentNode, this.setDimensions);
  };

  shouldComponentUpdate = (nextProps, nextState) => shallowCompare(this, nextProps, nextState);

  componentWillUnmount = () => erd.removeListener(this.parentNode, this.setDimensions);

  setDimensions = el => compose(bind(this.setState, this), this.selectDimensionsFromElemenet)(el);

  selectDimensionsFromElemenet = el => compose(
    this.removePaddingFromDimensions(el),
    mapValues(this.maybeNan),
    pick(['height', 'width']),
    invoke('getBoundingClientRect'),
  )(el);

  maybeNan = val => (isNaN(val) ? 0 : val);

  selectPaddingValueFromStyle = styleValue => parseInt(styleValue, 10) || 0;

  selectPaddingValuesFromElement = el => {
    const {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
    } = window.getComputedStyle(el) || {};

    return {
      left: this.selectPaddingValueFromStyle(paddingLeft),
      right: this.selectPaddingValueFromStyle(paddingRight),
      top: this.selectPaddingValueFromStyle(paddingTop),
      bottom: this.selectPaddingValueFromStyle(paddingBottom),
    };
  };

  removePaddingFromDimensions = el => {
    const padding = this.selectPaddingValuesFromElement(el);
    return dimensions => ({
      height: dimensions.height - padding.top - padding.bottom,
      width: dimensions.width - padding.left - padding.right,
    });
  };

  render = () => this.props.children(this.state);
}
