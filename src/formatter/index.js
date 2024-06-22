import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formats = {
  stylish,
  plain,
  json,
};

export default (format, data) => formats[format](data);
