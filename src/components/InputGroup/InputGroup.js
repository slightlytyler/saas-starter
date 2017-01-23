import cloneElement from 'common/react/cloneElement';
import mapChildren from 'common/react/mapChildren';
import { goBack, push, replace } from 'connected-react-router';
import withActions from 'containers/withActions';
import { compose, trimCharsStart } from 'lodash/fp';
import pathUtil from 'path';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { mapProps } from 'recompose';

const handleExpandPath = router => expandPath => nextExpandPath => {
  if (!expandPath) return router.push(nextExpandPath);
  if (expandPath === nextExpandPath) return router.goBack();
  return router.replace(nextExpandPath);
};

const applyChildProps = (expandPath, onExpandPath) => element => cloneElement(
  {
    expand: element.props.path === expandPath,
    onExpand: element.props.onChange || (() => onExpandPath(element.props.path)),
  },
  element,
);

const InputGroup = ({ children, fullPath, rootPath, router }) => {
  const expandPath = trimCharsStart(rootPath, fullPath);
  return (
    <Box column>
      {mapChildren(
        applyChildProps(expandPath, handleExpandPath(router)(expandPath)),
        children,
      )}
    </Box>
  );
};

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  fullPath: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  router: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const container = compose(
  withActions(props => ({
    goBack,
    push: expandPath => push(pathUtil.join(props.rootPath, expandPath)),
    replace: expandPath => replace(pathUtil.join(props.rootPath, expandPath)),
  })),
  mapProps(props => ({
    children: props.children,
    fullPath: props.fullPath,
    rootPath: props.rootPath,
    router: {
      goBack: props.goBack,
      push: props.push,
      replace: props.replace,
    },
  })),
);

export default container(InputGroup);
