import { curry, isFunction, isObject } from 'lodash/fp';

const namespaceType = (namespace, type) => `@@${namespace}/${type}`;

const creatorTypeError = new TypeError(
  '[ERROR] `createAction` requires that the argument `creator` be '
  + 'either a function for synchronous actions, or an object with keys '
  + '`initiate`, `succeed`, `fail`, and `cancel`.',
);

export default curry((namespace, { type, creator: creatorSelector }) => {
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
      INITIATED: namespaceType(namespace, `${type}/initiated`),
      SUCCEEDED: namespaceType(namespace, `${type}/succeeded`),
      FAILED: namespaceType(namespace, `${type}/failed`),
      CANCELLED: namespaceType(namespace, `${type}/cancelled`),
    };

    const initiate = initiateSelector(types.INITIATED);
    const succeed = succeedSelector(types.SUCCEEDED);
    const fail = failSelector(types.FAILED);
    const cancel = cancelSelector(types.CANCELLED);

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

  throw creatorTypeError;
});
