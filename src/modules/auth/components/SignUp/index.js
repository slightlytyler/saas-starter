import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAuthSignUp = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AuthSignUp',
  resolve: () => System.import('./AuthSignUp'),
});

export default AsyncAuthSignUp;
