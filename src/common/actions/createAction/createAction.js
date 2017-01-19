import { curry, isFunction, isObject } from 'lodash/fp';

const namespaceType = (namespace, type) => `@@${namespace}/${type}`;

const typeError = new TypeError(
  '[ERROR] `createAction` requires that the argument `creator` be '
  + 'either a function for synchronous actions, or an object with keys '
  + '`initiate`, `succeed`, `fail`, and `cancel`.',
);

const createAction = curry((namespace, { type, creator: creatorSelector }) => {
  if (isFunction(creatorSelector)) {
    const namespacedType = namespaceType(namespace, type);
    const creator = creatorSelector(namespacedType);

    // eslint-disable-next-line no-inner-declarations
    function action(data) {
      return creator(data);
    }

    action.type = namespacedType;

    return action;
  }

  if (isObject(creatorSelector)) {
    const {
      initiate: initiateSelector,
      succeed: succeedSelector,
      fail: failSelector,
      cancel: cancelSelector,
    } = creatorSelector;

    const types = {
      initiate: namespaceType(namespace, `${type}/initiate`),
      succeed: namespaceType(namespace, `${type}/succeed`),
      fail: namespaceType(namespace, `${type}/fail`),
      cancel: namespaceType(namespace, `${type}/cancel`),
    };

    const initiate = initiateSelector(types.initiate);
    const succeed = succeedSelector(types.succeed);
    const fail = failSelector(types.fail);
    const cancel = cancelSelector(types.cancel);

    // eslint-disable-next-line no-inner-declarations
    function action(...args) {
      return initiate(...args);
    }

    action.succeed = succeed;
    action.fail = fail;
    action.cancel = cancel;
    action.types = types;

    return action;
  }

  throw typeError;
});

export default createAction;
