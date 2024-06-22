import { getFullPath, readFile } from '../src/functionsFS.js';
import genDiff from '../src/index.js';

const result = readFile(getFullPath('./__fixtures__/result.txt'));

const getFullPathFiles = (extension) => [
  getFullPath(`./__fixtures__/file1${extension}`),
  getFullPath(`./__fixtures__/file2${extension}`),
];

test('genDiffExtensionJSON', () => {
  const extension = '.json';

  expect(genDiff(...getFullPathFiles(extension))).toEqual(result);
});

test('genDiffExtensionYAML', () => {
  const extension = '.yaml';

  expect(genDiff(...getFullPathFiles(extension))).toEqual(result);
});

test('genDiffExtensionYML', () => {
  const extension = '.yml';

  expect(genDiff(...getFullPathFiles(extension))).toEqual(result);
});
