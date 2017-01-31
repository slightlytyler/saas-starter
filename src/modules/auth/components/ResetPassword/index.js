import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAuthResetPassword = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AuthResetPassword',
  resolve: () => System.import('./AuthResetPassword'),
});

export default AsyncAuthResetPassword;
