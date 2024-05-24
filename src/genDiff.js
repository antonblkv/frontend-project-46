import _ from 'lodash';
import parse from './parsers.js';
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';

const getAbsoluteFilePath = (filepath) => path.resolve(cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const absoluteFilePath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilePath2 = getAbsoluteFilePath(filepath2);
  const data1 = parse(absoluteFilePath1);
  const data2 = parse(absoluteFilePath2);
  const keys = [..._.keys(data1), ..._.keys(data2)];
  const sortedKeys = _.sortedUniq(_.sortBy(keys));
  let result = '';


	for (const key of sortedKeys) {
    if (data1[key] === data2[key]) {
      result += `  ${key}: ${data1[key]}\n`;
    } else {
      result += Object.hasOwn(data1, key) ? `- ${key}: ${data1[key]}\n` : '';
      result += Object.hasOwn(data2, key) ? `+ ${key}: ${data2[key]}\n` : '';
     
    }
  }

  return result.slice(0, -1);
};

export default genDiff;
