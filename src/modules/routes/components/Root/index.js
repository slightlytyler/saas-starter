import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncRoutesRoot = createAsyncComponent({
  Loading: PageSpinner,
  name: 'RoutesRoot',
  resolve: () => System.import('./RoutesRoot'),
});

export default AsyncRoutesRoot;
