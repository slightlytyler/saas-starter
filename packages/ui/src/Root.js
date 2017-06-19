import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

const Root = props => (
  <Switch>
    <Route render={() => <div>Test</div>} />
  </Switch>
);

export default Root;
