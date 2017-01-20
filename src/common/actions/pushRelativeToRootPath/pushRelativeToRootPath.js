import { push } from 'connected-react-router';
import path from 'path';

const pushRelativeToRootPath = rootPath => appendixPath => push(path.join(rootPath, appendixPath));

export default pushRelativeToRootPath;
