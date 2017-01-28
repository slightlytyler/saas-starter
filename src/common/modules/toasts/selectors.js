import { get } from 'lodash/fp';
import { name } from './config';

export const selectSubstate = get(name);
