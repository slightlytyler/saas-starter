import { omit } from 'lodash/fp';
import { mapProps } from 'recompose';

const omitProps = propKeys => mapProps(omit(propKeys));

export default omitProps;
