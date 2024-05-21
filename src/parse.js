import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const parse = file => JSON.parse(fs.readFileSync(path.resolve(cwd(), file), { encoding: 'utf-8' }));

export { parse };
