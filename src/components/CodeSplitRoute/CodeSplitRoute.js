import { CodeSplit } from 'code-split-component';
import React, { PropTypes } from 'react';
import { Route } from 'react-router';

const CodeSplitRoute = ({ chunkName, modules, render, ...props }) => (
  <Route
    {...props}
    render={renderProps => (
      <CodeSplit
        chunkName={chunkName}
        modules={modules}
      >
        {codeSplitProps => render({ ...renderProps, ...codeSplitProps })}
      </CodeSplit>
    )}
  />
);

CodeSplitRoute.propTypes = {
  chunkName: PropTypes.string.isRequired,
  modules: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
};

export default CodeSplitRoute;
