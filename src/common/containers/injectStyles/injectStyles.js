import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { compose } from 'lodash/fp';
import { create as createInjectSheet } from 'react-jss';
import omitProps from '../omitProps';

const jss = createJss();

jss.setup(preset());

const injectSheet = createInjectSheet(jss);

const injectStyles = styles => compose(injectSheet(styles), omitProps('sheet'));

export default injectStyles;
