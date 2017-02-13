import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import { create as createInjectSheet } from 'react-jss';

const jss = createJss();

jss.setup(preset());

const injectStyles = createInjectSheet(jss);

export default injectStyles;
