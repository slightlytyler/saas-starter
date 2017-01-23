import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAdaptersCollectionViewer = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AdaptersCollectionViewer',
  resolve: () => System.import('./AdaptersCollectionViewer'),
});

export default AsyncAdaptersCollectionViewer;
