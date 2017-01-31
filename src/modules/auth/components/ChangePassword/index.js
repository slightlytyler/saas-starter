import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAuthChangePassword = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AuthChangePassword',
  resolve: () => System.import('./AuthChangePassword'),
});

export default AsyncAuthChangePassword;
