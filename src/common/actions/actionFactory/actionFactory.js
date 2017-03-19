// @flow
import invariant from 'invariant';
import {
  compose,
  curry,
  isFunction,
  isPlainObject,
  keys,
  reduce,
} from 'lodash/fp';

const createType = (name: string): Function =>
  (base: string, sub: string): string =>
    `@@${name}/${base}${sub ? `/${sub}` : ''}`;

const actionFactory = curry((name, {
  type: basetype,
  creator: creatorSelector,
}) => {
  invariant(
    isFunction(creatorSelector) || isPlainObject(creatorSelector),
    '`actionFactory` requires that the argument `creator` be ' +
      'either a function for synchronous actions, or an object with keys ' +
      'representing the respective types for an asynchronous action.',
  );

  const namespaceType = createType(name);

  if (isPlainObject(creatorSelector)) {
    invariant(
      creatorSelector.initiate,
      '`actionFactory` requires a creator with `initiate` key for asynchronous actions.',
    );

    // eslint-disable-next-line no-inner-declarations
    const baseAction = compose(creatorSelector.initiate, namespaceType)(
      basetype,
      'initiate',
    );
    baseAction.types = {};

    const action = reduce(
      (acc, subtype) => {
        const type = namespaceType(basetype, subtype);
        // eslint-disable-next-line no-param-reassign
        acc[subtype] = creatorSelector[subtype](type);
        // eslint-disable-next-line no-param-reassign
        acc.types[subtype] = type;
        return acc;
      },
      baseAction,
      keys(creatorSelector),
    );

    return action;
  }

  const type = namespaceType(basetype);
  const action = creatorSelector(type);
  action.type = type;

  return action;
});

export default actionFactory;
