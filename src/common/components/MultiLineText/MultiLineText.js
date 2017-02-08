import { compose, map, split } from 'lodash/fp';
import React, { PropTypes } from 'react';

const mapWithIndex = map.convert({ cap: false });

const renderLine = (text, key) => <span key={key}>{text}<br /></span>;

const renderText = compose(
  mapWithIndex(renderLine),
  split('\n'),
);

const MultiLineText = ({ children }) => (
  <span>
    {renderText(children)}
  </span>
);

MultiLineText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MultiLineText;
