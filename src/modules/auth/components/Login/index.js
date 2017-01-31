import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAuthLogin = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AuthLogin',
  resolve: () => System.import('./AuthLogin'),
});

export default AsyncAuthLogin;
