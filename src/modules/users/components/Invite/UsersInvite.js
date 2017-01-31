import InputBlock from 'common/components/InputBlock';
import withActions from 'common/containers/withActions';
import React, { PropTypes } from 'react';
import Form from './UsersInviteForm';
import * as actions from '../../actions';

const UsersInvite = ({ onSubmit }) => (
  <InputBlock
    forceOpen
    icon="person"
    title="Invite User"
  >
    {() => <Form onSubmit={onSubmit} />}
  </InputBlock>
);

UsersInvite.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const container = withActions({ onSubmit: actions.sendInvite });

export default container(UsersInvite);
