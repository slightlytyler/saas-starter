import connect from 'common/containers/connect';
import { compose, dropRight, last, map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { lifecycle, mapProps, withState } from 'recompose';
import Item from '../Item';
import Prompt from '../Prompt';
import * as selectors from '../../selectors';

// eslint-disable-next-line react/prop-types
const renderDialog = ({ id, message, type, ...props }) => {
  switch (type) {
    case 'prompt': {
      return (
        <Prompt
          key={id}
          {...props}
        >
          {message}
        </Prompt>
      );
    }

    default: {
      return (
        <Item
          key={id}
          {...props}
        >
          {message}
        </Item>
      );
    }
  }
};

const renderDialogs = map(renderDialog);

const DialogsRoot = ({ dialogs }) => {
  if (!size(dialogs)) return null;
  return (
    <div>
      {renderDialogs(dialogs)}
    </div>
  );
};

DialogsRoot.propTypes = {
  dialogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    modal: PropTypes.bool,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

const container = compose(
  connect({
    mapStateToProps: { dialogs: selectors.selectSubstate },
  }),
  withState('dialogsBuffer', 'setDialogsBuffer', []),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const lengthDiff = size(nextProps.dialogs) - size(this.props.dialogs);
      if (lengthDiff > 0) {
        this.props.setDialogsBuffer([
          ...this.props.dialogsBuffer,
          { ...last(nextProps.dialogs), open: true },
        ]);
      }
      if (lengthDiff < 0) {
        this.props.setDialogsBuffer(
          [
            ...dropRight(1, this.props.dialogsBuffer),
            { ...last(this.props.dialogsBuffer), open: false },
          ],
          () => setTimeout(
            () => this.props.setDialogsBuffer(dropRight(1, this.props.dialogsBuffer)),
            500,
          ),
        );
      }
    },
  }),
  mapProps(props => ({
    dialogs: props.dialogsBuffer,
  })),
);

export default container(DialogsRoot);
