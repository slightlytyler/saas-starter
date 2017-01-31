import Form from 'common/components/Form';
import React from 'react';
import yup from 'yup';

const formSchema = yup.object({
  email: yup.string().required('is required'),
});

const UsersInviteForm = props => (
  <Form {...props} schema={formSchema}>
    <Form.Field autoFocus name="email" />
    <Form.SubmitButton label="Invite User" />
  </Form>
);

export default UsersInviteForm;
