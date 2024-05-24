import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const parsers = (filepath) => {
	const extension = path.extname(filepath);
	const file = fs.readFileSync(filepath, 'utf-8');

	switch (extension) {
		case '.json':
			return JSON.parse(file);
		case '.yml':
			return YAML.parse(file);
		case '.yaml':
			return YAML.parse(file);
	}
}
	
export default parsers;