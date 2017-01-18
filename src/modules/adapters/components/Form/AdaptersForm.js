import Form from 'components/Form';
import Panel from 'components/Panel';
import React, { PropTypes } from 'react';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  description: yup.string(),
});

const AdaptersForm = ({ defaultValue, loading, onSubmit }) => {
  if (loading) return <div>Loading</div>;
  return (
    <Panel>
      <Form defaultValue={defaultValue} onSubmit={onSubmit} schema={formSchema}>
        <Form.Field fullWidth name="name" />
        <Form.Field fullWidth name="description" />
        <Form.SubmitButton label="Create Adapter" />
      </Form>
    </Panel>
  );
};

AdaptersForm.propTypes = {
  defaultValue: PropTypes.object,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

AdaptersForm.defaultProps = {
  defaultValue: null,
  loading: false,
};

export default AdaptersForm;
