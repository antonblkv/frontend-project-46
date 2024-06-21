import YAML from 'yaml';

const parsers = {
	json: JSON.parse,
	yaml: YAML.parse,
	yml: YAML.parse
}

export default (data, extension) => parsers[extension](data);