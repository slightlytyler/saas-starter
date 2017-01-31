import PageSpinner from 'common/components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAdaptersRecordBuilder = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AdaptersRecordBuilder',
  resolve: () => System.import('./AdaptersRecordBuilder'),
});

export default AsyncAdaptersRecordBuilder;
