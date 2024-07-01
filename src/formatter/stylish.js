import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpace}}`;
};

const iter = (tree, depth = 1) => {
  const result = tree.flatMap(({
    type, key, children, value, value1, value2,
  }) => {
    switch (type) {
      case 'nested': {
        return `${getIndent(depth)}  ${key}: {\n${iter(children, depth + 1).join('\n')}\n${getIndent(
          depth,
        )}${doubleSpace}}`;
      }
      case 'deleted': {
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'changed': {
        return `${getIndent(depth)}- ${key}: ${stringify(value1, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(
          value2,
          depth,
        )}`;
      }
      case 'unchanged': {
        return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`;
      }
      default:
        throw new Error(`Error: ${type} - this type doesn't exist in this file`);
    }
  });
  return result;
};

export default (tree) => `{\n${iter(tree).join('\n')}\n}`;
