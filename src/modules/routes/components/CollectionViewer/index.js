import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncRoutesCollectionViewer = createAsyncComponent({
  Loading: PageSpinner,
  name: 'RoutesCollectionViewer',
  resolve: () => System.import('./RoutesCollectionViewer'),
});

export default AsyncRoutesCollectionViewer;
