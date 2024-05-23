import parse from './parse.js';
import _ from 'lodash';


const genDiff = (file1, file2) => {
	const data1 = parse(file1);
	const data2 = parse(file2);
	const keys = [..._.keys(data1), ..._.keys(data2)];
	const sortedKeys = _.sortedUniq(_.sortBy(keys));
	let result = '';

	for (const key of sortedKeys) {
		if (data1[key] === data2[key]) {
			result += `  ${key}: ${data1[key]}\n`;
		} else {
			result += data1.hasOwnProperty(key) ? `- ${key}: ${data1[key]}\n` : '';
			result += data2.hasOwnProperty(key) ? `+ ${key}: ${data2[key]}\n` : '';
		}
	}

	return result;
};

export default genDiff;
