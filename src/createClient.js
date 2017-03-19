import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';

const createClient = (
  {
    customResolversFactory = () => ({}),
    dataIdFromObject,
    middleware,
    uri,
  },
) => {
  const networkInterface = createNetworkInterface({ uri });
  networkInterface.use(middleware);
  const resolveObjectFromCache = (_, args) => toIdValue(dataIdFromObject(args));
  const customResolvers = customResolversFactory({ resolveObjectFromCache });
  const client = new ApolloClient({
    customResolvers,
    dataIdFromObject,
    networkInterface,
  });
  return client;
};

export default createClient;
