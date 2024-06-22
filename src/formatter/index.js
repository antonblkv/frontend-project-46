import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
};

export default (format, data) => formats[format](data);
