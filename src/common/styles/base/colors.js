import parseVariables from '../helpers/parseVariables';

// eslint-disable-next-line import/no-webpack-loader-syntax
const colors = parseVariables(require('!raw-loader!./colors.styl'));

export default colors;
