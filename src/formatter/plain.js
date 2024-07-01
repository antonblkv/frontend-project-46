import _ from 'lodash';

const getValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';

  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const iter = (tree, path = '') => {
  const result = tree
    .filter((node) => node.type !== 'unchanged')
    .flatMap(({
      type, key, children, value, value1, value2,
    }) => {
      const fullPath = path === '' ? `${key}` : `${path}.${key}`;

      switch (type) {
        case 'nested': {
          return iter(children, fullPath);
        }
        case 'deleted': {
          return `Property '${fullPath}' was removed`;
        }
        case 'added': {
          return `Property '${fullPath}' was added with value: ${getValue(value)}`;
        }
        case 'changed': {
          return `Property '${fullPath}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
        }
        default:
          throw new Error(`Error: ${type} - this type doesn't exist in this file`);
      }
    });
  return result;
};

export default (tree) => iter(tree).join('\n');
