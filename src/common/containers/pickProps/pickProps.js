import { pick } from 'lodash/fp';
import { mapProps } from 'recompose';

const pickProps = propKeys => mapProps(pick(propKeys));

export default pickProps;
