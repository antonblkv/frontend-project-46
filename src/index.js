import buildTree from './treeBuilder.js';
import formatter from './formatter/index.js';
import { getFullPath, getData } from './functionsFS.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullFilePath1 = getFullPath(filepath1);
  const fullFilePath2 = getFullPath(filepath2);

  const data1 = getData(fullFilePath1);
  const data2 = getData(fullFilePath2);

  const tree = buildTree(data1, data2);

  return formatter(format, tree);
};

export default genDiff;
