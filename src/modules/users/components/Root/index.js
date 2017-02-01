import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncUsersRoot = createAsyncComponent({
  Loading: PageSpinner,
  name: 'UsersRoot',
  resolve: () => System.import('./UsersRoot'),
});

export default AsyncUsersRoot;

