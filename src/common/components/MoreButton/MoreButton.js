import { FloatingActionButton, FontIcon } from 'material-ui';
import React from 'react';
import { toClass } from 'recompose';

const MoreButton = props => (
  <FloatingActionButton mini secondary zDepth={1} {...props}>
    <FontIcon className="material-icons">more_vert</FontIcon>
  </FloatingActionButton>
);

export default toClass(MoreButton);
