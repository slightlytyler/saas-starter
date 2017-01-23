import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAuthRoot = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AuthRoot',
  resolve: () => System.import('./AuthRoot'),
});

export default AsyncAuthRoot;
