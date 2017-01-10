import { isArray, omit, pick } from 'lodash/fp';

export default (propsConfig, props) => {
  if (isArray(propsConfig)) return omit(propsConfig, props);

  const { propsBlackList, propsWhiteList } = propsConfig;

  if (propsWhiteList) return pick(propsWhiteList, props);
  return omit(propsBlackList, props);
};
