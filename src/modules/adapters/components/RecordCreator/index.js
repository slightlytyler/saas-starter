import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAdaptersRecordCreator = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AdaptersRecordCreator',
  resolve: () => System.import('./AdaptersRecordCreator'),
});

export default AsyncAdaptersRecordCreator;
