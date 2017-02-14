import { createAsyncComponent } from 'react-async-component';

const AsyncPostCreator = createAsyncComponent({
  resolve: () => System.import('./PostCreator'),
});

export default AsyncPostCreator;
