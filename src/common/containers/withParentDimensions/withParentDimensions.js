import createElementResizeDetector from 'element-resize-detector';
import { compose, invoke, mapValues, pick } from 'lodash/fp';
import { findDOMNode } from 'react-dom';
import { flattenProp, lifecycle, withState } from 'recompose';

const erd = createElementResizeDetector();

const maybeNan = val => (isNaN(val) ? 0 : val);

const selectPaddingValueFromStyle = styleValue => parseInt(styleValue, 10) || 0;

const selectPaddingValuesFromElement = el => {
  const {
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
  } = window.getComputedStyle(el) || {};

  return {
    left: selectPaddingValueFromStyle(paddingLeft),
    right: selectPaddingValueFromStyle(paddingRight),
    top: selectPaddingValueFromStyle(paddingTop),
    bottom: selectPaddingValueFromStyle(paddingBottom),
  };
};

const removePaddingFromDimensions = el => {
  const padding = selectPaddingValuesFromElement(el);
  return dimensions => ({
    height: dimensions.height - padding.top - padding.bottom,
    width: dimensions.width - padding.left - padding.right,
  });
};

const selectDimensionsFromElemenet = el => compose(
  removePaddingFromDimensions(el),
  mapValues(maybeNan),
  pick(['height', 'width']),
  invoke('getBoundingClientRect'),
)(el);

const withParentDimensions = compose(
  withState('dimensions', 'setDimensions', { height: 0, width: 0 }),
  lifecycle({
    componentDidMount() {
      this.parentNode = findDOMNode(this).parentNode;
      this.handleDimensions = compose(this.props.setDimensions, selectDimensionsFromElemenet);
      this.handleDimensions(this.parentNode);
      erd.listenTo(this.parentNode, this.handleDimensions);
    },
    componentWillUnmount() {
      erd.removeListener(this.parentNode, this.setDimensions);
    },
  }),
  flattenProp('dimensions'),
);

export default withParentDimensions;
