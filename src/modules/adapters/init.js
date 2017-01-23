import { once } from 'lodash/fp';
import { stateKey } from './config';
import reducer from './reducer';
import sagas from './sagas';

const init = once(store => {
  store.injectReducer({ key: stateKey, reducer });
  store.injectSagas({ key: stateKey, sagas });
});

export default init;
