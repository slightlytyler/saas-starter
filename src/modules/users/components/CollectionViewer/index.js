import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncUsersCollectionViewer = createAsyncComponent({
  Loading: PageSpinner,
  name: 'UsersCollectionViewer',
  resolve: () => System.import('./UsersCollectionViewer'),
});

export default AsyncUsersCollectionViewer;
