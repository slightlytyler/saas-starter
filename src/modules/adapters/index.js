import { stateKey } from './config';
import reducer from './reducer';
import sagas from './sagas';

export const init = store => {
  store.injectReducer({ key: stateKey, reducer });
  store.injectSagas({ key: stateKey, sagas });
};

export Root from './components/Root';
