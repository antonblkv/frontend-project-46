import _ from 'lodash';
import parse from './parse.js';

const genDiff = (file1, file2) => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const keys = [..._.keys(data1), ..._.keys(data2)];
  const sortedKeys = _.sortedUniq(_.sortBy(keys));
  let result = '';

  /* eslint-disable-next-line */
	for (const key of sortedKeys) {
    if (data1[key] === data2[key]) {
      result += `  ${key}: ${data1[key]}\n`;
    } else {
      result += Object.hasOwn(data1, key) ? `- ${key}: ${data1[key]}\n` : '';
      result += Object.hasOwn(data2, key) ? `+ ${key}: ${data2[key]}\n` : '';
    }
  }

  return result;
};

export default genDiff;
