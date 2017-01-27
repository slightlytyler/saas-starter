import Form from 'components/Form';
import React from 'react';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  description: yup.string(),
});

const AdaptersForm = props => (
  <Form
    {...props}
    schema={formSchema}
    style={{ padding: '16px' }}
  >
    <Form.Field name="name" />
    <Form.Field name="description" />
    <Form.SubmitButton label="Save Adapter" />
  </Form>
);

export default AdaptersForm;
