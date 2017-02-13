import { createAsyncComponent } from 'react-async-component';

const AsyncPostItem = createAsyncComponent({
  resolve: () => System.import('./PostItem'),
});

export default AsyncPostItem;
