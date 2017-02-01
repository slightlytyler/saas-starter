import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncRoutesRecordBuilder = createAsyncComponent({
  Loading: PageSpinner,
  name: 'RoutesRecordBuilder',
  resolve: () => System.import('./RoutesRecordBuilder'),
});

export default AsyncRoutesRecordBuilder;
