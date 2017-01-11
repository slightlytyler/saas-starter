import path from 'path';
import { API_BASE_PATH, API_HOST, API_SCHEME } from 'src/config';

export default endpoint => `${API_SCHEME}://${path.join(API_HOST, API_BASE_PATH, endpoint)}`;
