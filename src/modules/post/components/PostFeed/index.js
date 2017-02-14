import { createAsyncComponent } from 'react-async-component';

const AsyncPostFeed = createAsyncComponent({
  resolve: () => System.import('./PostFeed'),
});

export default AsyncPostFeed;
