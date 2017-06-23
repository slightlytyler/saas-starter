import {compose, get} from 'lodash/fp';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {mapProps} from 'recompose';
import {createSelector, createStructuredSelector} from 'reselect';
import wrapAndSetDisplayName from 'common/hocs/wrapAndSetDisplayName';
import selectSearchParams from 'core/router/selectors/selectSearchParams';
import AuthButton from 'features/auth/components/AuthButton';
import AuthHandler from 'features/auth/components/AuthHandler';

const selectCode = createSelector(selectSearchParams, get('code'));

const selectProps = createStructuredSelector({
  code: selectCode,
});

const withCode = compose(
  wrapAndSetDisplayName('withCode'),
  mapProps(selectProps),
);

const AuthHandlerWithCode = withCode(AuthHandler);

const Root = () => (
  <div>
    <Switch>
      <Route component={AuthHandlerWithCode} path="/login" />
      <Route
        render={() => (
          <div>
            <AuthButton />
            <Switch>
              <Route exact path="/" render={() => <div>Home</div>} />
              <Route
                render={() => <div>404 Page not found motherfucker.</div>}
              />
            </Switch>
          </div>
        )}
      />
    </Switch>
  </div>
);

export default Root;
