import PageSpinner from 'components/PageSpinner';
import { createAsyncComponent } from 'react-async-component';

const AsyncAdaptersRecordEditor = createAsyncComponent({
  Loading: PageSpinner,
  name: 'AdaptersRecordEditor',
  resolve: () => System.import('./AdaptersRecordEditor'),
});

export default AsyncAdaptersRecordEditor;
