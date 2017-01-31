import {
  Checkbox as MaterialCheckbox,
  TextField as MaterialTextField,
} from 'material-ui';
import Formal from 'react-formal';
import { withProps } from 'recompose';
import asField from './asField';
import Form from './Form';
import Field from './FormField';
import SubmitButton from './FormSubmitButton';

export const CheckboxField = asField('checked', 'onCheck', false)(MaterialCheckbox);
export const TextField = asField('value', 'onChange', '')(MaterialTextField);
export const NumberField = withProps({ type: 'number' })(TextField);
export const PasswordField = withProps({ type: 'password' })(TextField);

Formal.addInputTypes({
  boolean: CheckboxField,
  checkbox: CheckboxField,
  number: NumberField,
  password: PasswordField,
  string: TextField,
  text: TextField,
});

Form.Field = Field;
Form.SubmitButton = SubmitButton;

export default Form;
