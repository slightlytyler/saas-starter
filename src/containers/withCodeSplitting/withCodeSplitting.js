import { PropTypes } from 'react';
import { withContext } from 'recompose';

const chunks = {};

const modules = {};

const registerChunkLoaded = chunkName => { chunks[chunkName] = true; };

const registerModule = (moduleHash, module) => { modules[moduleHash] = module; };

const retrieveModule = (moduleHash) => modules[moduleHash];

const withCodeSplitting = withContext(
  {
    registerChunkLoaded: PropTypes.func.isRequired,
    registerModule: PropTypes.func.isRequired,
    retrieveModule: PropTypes.func.isRequired,
  },
  () => ({
    registerChunkLoaded,
    registerModule,
    retrieveModule,
  }),
);

export default withCodeSplitting;
