import { getFullPath, readFile } from '../src/functionsFS.js';
import genDiff from '../src/index.js';

const resultStylish = readFile(getFullPath('./__fixtures__/resultStylish.txt'));
const resultPlain = readFile(getFullPath('./__fixtures__/resultPlain.txt'));

const getFullPathFiles = (extension) => [
  getFullPath(`./__fixtures__/file1${extension}`),
  getFullPath(`./__fixtures__/file2${extension}`),
];

test('genDiffExtensionJSONFormatterStylish', () => {
  expect(genDiff(...getFullPathFiles('.json'))).toEqual(resultStylish);
});

test('genDiffExtensionYAMLFormatterStylish', () => {
  expect(genDiff(...getFullPathFiles('.yaml'))).toEqual(resultStylish);
});

test('genDiffExtensionYMLFormatterStylish', () => {
  expect(genDiff(...getFullPathFiles('.yml'))).toEqual(resultStylish);
});

test('genDiffExtensionJSONFormatterPlain', () => {
  expect(genDiff(...getFullPathFiles('.json'), 'plain')).toEqual(resultPlain);
});

test('genDiffExtensionYAMLFormatterPlain', () => {
  expect(genDiff(...getFullPathFiles('.yaml'), 'plain')).toEqual(resultPlain);
});

test('genDiffExtensionYMLFormatterPlain', () => {
  expect(genDiff(...getFullPathFiles('.yml'), 'plain')).toEqual(resultPlain);
});
