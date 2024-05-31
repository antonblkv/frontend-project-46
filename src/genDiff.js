import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parse from './parsers.js';

const getFullPath = filepath => path.resolve(cwd(), filepath);
const extractExtension = filepath => path.extname(filepath).slice(1);
const getData = filepath => parse(fs.readFileSync(filepath, 'utf-8'), extractExtension(filepath));

const genDiff = (filepath1, filepath2) => {
	const fullFilePath1 = getFullPath(filepath1);
	const fullFilePath2 = getFullPath(filepath2);

	const data1 = getData(fullFilePath1);
	const data2 = getData(fullFilePath2);

  console.log(data1)
  console.log(data2);
};

export default genDiff;
