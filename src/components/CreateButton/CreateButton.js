import { FloatingActionButton, FontIcon } from 'material-ui';
import React from 'react';
import { toClass } from 'recompose';

const CreateButton = props => (
  <FloatingActionButton mini {...props}>
    <FontIcon className="material-icons">add</FontIcon>
  </FloatingActionButton>
);

export default toClass(CreateButton);
