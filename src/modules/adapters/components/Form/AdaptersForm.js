import Field from 'components/forms/Field';
import Form from 'components/forms/Form';
import SubmitButton from 'components/forms/SubmitButton';
import Panel from 'components/Panel';
import { isNull } from 'lodash/fp';
import React, { PropTypes } from 'react';
import yup from 'yup';

const formSchema = yup.object({
  name: yup.string().required('is required'),
  description: yup.string(),
});

const defaultValueIsPending = isNull;

const AdaptersForm = ({ defaultValue, onSubmit }) => {
  if (defaultValueIsPending(defaultValue)) return <div>Loading</div>;
  return (
    <Panel>
      <Form defaultValue={defaultValue} onSubmit={onSubmit} schema={formSchema}>
        <Field fullWidth name="name" />
        <Field fullWidth name="description" />
        <SubmitButton label="Create Adapter" />
      </Form>
    </Panel>
  );
};

AdaptersForm.propTypes = {
  defaultValue: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

AdaptersForm.defaultProps = {
  defaultValue: undefined,
};

export default AdaptersForm;
