import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import parse from './parse.js';

const getFullPath = filepath => path.resolve(cwd(), filepath);
const extractExtension = filepath => path.extname(filepath).slice(1);
const getData = filepath => parse(fs.readFileSync(filepath, 'utf-8'), extractExtension(filepath));

export { getFullPath, getData };
