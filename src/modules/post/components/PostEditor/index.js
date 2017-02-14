import { createAsyncComponent } from 'react-async-component';

const AsyncPostEditor = createAsyncComponent({
  resolve: () => System.import('./PostEditor'),
});

export default AsyncPostEditor;
