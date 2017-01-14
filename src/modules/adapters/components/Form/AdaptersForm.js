import Field from 'components/forms/Field';
import Form from 'components/forms/Form';
import SubmitButton from 'components/forms/SubmitButton';
import React, { PropTypes } from 'react';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  description: yup.string(),
});

const AdaptersForm = ({ onSubmit }) => (
  <Form onSubmit={onSubmit} schema={formSchema}>
    <Field name="name" />
    <Field name="description" />
    <SubmitButton label="Create Adapter" />
  </Form>
);

AdaptersForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AdaptersForm;
