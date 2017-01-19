import { isArray } from 'lodash/fp';

const toArray = val => (isArray(val) ? val : [val]);

export default toArray;
