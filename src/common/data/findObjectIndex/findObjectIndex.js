import { compose, eq, findIndex, get } from 'lodash/fp';

const findObjectIndex = (id, list) => findIndex(compose(eq(id), get('id')), list);

export default findObjectIndex;
