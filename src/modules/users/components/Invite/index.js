import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncUsersInvite = createAsyncComponent({
  Loading: PageSpinner,
  name: 'UsersInvite',
  resolve: () => System.import('./UsersInvite'),
});

export default AsyncUsersInvite;
