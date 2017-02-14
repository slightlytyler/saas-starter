import { createAsyncComponent } from 'react-async-component';

const AsyncPostList = createAsyncComponent({
  resolve: () => System.import('./PostList'),
});

export default AsyncPostList;
