// Libraries
import {resolve, join} from 'path';


export const rootPath = resolve('../../');
export function getAbsolutePath(filePath) {
  return join(rootPath, filePath);
}

export {
  rootPath,
  srcPath,
  distPath,
  getAbsolutePath
};
