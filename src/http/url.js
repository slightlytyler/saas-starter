import path from 'path';
import { BASE_PATH, HOST, SCHEME } from 'src/config';

export default endpoint => `${SCHEME}://${path.join(HOST, BASE_PATH, endpoint)}`;
