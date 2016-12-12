import { curry } from 'lodash/fp';

export default curry((namespace, { type, creator: creatorSelector }) => {
  const namespacedType = `@@${namespace}/${type}`;
  const creator = creatorSelector(namespacedType);

  const action = function(data) {
    return creator(data);
  }

  action.type = namespacedType;

  return action;
});
