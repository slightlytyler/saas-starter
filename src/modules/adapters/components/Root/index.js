import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAdaptersRoot = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AdaptersRoot',
  resolve: () => System.import('./AdaptersRoot'),
});

export default AsyncAdaptersRoot;
