import { getFullPath, readFile } from '../src/functionsFS.js';
import genDiff from '../src/index.js';

const result = readFile(getFullPath('./__fixtures__/result.txt'));

test('genDiffExtensionJSON', () => {
  const filePath1 = getFullPath('./__fixtures__/file1.json');
  const filePath2 = getFullPath('./__fixtures__/file2.json');

  expect(genDiff(filePath1, filePath2)).toEqual(result);
});

test('genDiffExtensionYAML', () => {
  const filePath1 = getFullPath('./__fixtures__/file1.yaml');
  const filePath2 = getFullPath('./__fixtures__/file2.yaml');

  expect(genDiff(filePath1, filePath2)).toEqual(result);
});

test('genDiffExtensionYML', () => {
  const filePath1 = getFullPath('./__fixtures__/file1.yml');
  const filePath2 = getFullPath('./__fixtures__/file2.yml');

  expect(genDiff(filePath1, filePath2)).toEqual(result);
});
