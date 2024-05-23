import { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result =
	'- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n';

test('genDiff', () => {
	const filePath1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
	const filePath2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

	expect(genDiff(filePath1, filePath2)).toEqual(result);
});
