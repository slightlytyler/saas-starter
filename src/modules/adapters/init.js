import { once } from 'lodash/fp';
import initOperations from 'modules/operations/init';
import { stateKey } from './config';
import reducer from './reducer';
import sagas from './sagas';

const init = once(store => {
  store.injectReducer({ key: stateKey, reducer });
  store.injectSagas({ key: stateKey, sagas });
  initOperations(store);
});

export default init;
