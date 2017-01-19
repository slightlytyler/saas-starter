import { compose, get, identity, isNull, memoize, omit } from 'lodash/fp';
import { defaultProps, mapProps } from 'recompose';

const handleChange = memoize(fn => compose(fn, get('target.value')));

const asField = (valueKey, handlerKey, nullValue) => compose(
  defaultProps({
    [handlerKey]: identity,
    [valueKey]: null,
  }),
  mapProps(props => ({
    ...omit('meta', props),
    [handlerKey]: handleChange(props.onChange),
    [valueKey]: isNull(props.value) ? nullValue : props.value,
  })),
);

export default asField;
