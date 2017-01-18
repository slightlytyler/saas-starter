import { FloatingActionButton } from 'material-ui';
import React from 'react';
import { toClass } from 'recompose';
import MaterialIcon from '../MaterialIcon';

const CreateButton = props => (
  <FloatingActionButton mini {...props}>
    <MaterialIcon>add</MaterialIcon>
  </FloatingActionButton>
);

export default toClass(CreateButton);
