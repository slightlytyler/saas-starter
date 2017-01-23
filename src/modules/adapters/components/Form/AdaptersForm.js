import Form from 'components/Form';
import React, { PropTypes } from 'react';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  description: yup.string(),
});

const AdaptersForm = ({ defaultValue, onSubmit }) => (
  <Form
    defaultValue={defaultValue}
    onSubmit={onSubmit}
    schema={formSchema}
    style={{ padding: '16px' }}
  >
    <Form.Field name="name" />
    <Form.Field name="description" />
    <Form.SubmitButton label="Save Adapter" />
  </Form>
);

AdaptersForm.propTypes = {
  defaultValue: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

AdaptersForm.defaultProps = {
  defaultValue: undefined,
};

export default AdaptersForm;
