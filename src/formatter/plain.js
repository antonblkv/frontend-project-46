import _ from 'lodash';

const getValue = (node) => {
  if (_.has(node, 'value')) {
    if (_.isPlainObject(node.value)) return '[complex value]';

    const value = typeof node.value === 'string' ? `'${node.value}'` : node.value;

    return value;
  }

  let value1 = typeof node.value1 === 'string' ? `'${node.value1}'` : node.value1;

  if (_.isPlainObject(node.value1)) value1 = '[complex value]';

  let value2 = typeof node.value2 === 'string' ? `'${node.value2}'` : node.value2;

  if (_.isPlainObject(node.value2)) value2 = '[complex value]';

  return [value1, value2];
};

const plain = (tree) => {
  const iter = (currentNode, path) => {
    if (currentNode.type === 'added') {
      const value = getValue(currentNode);
      return `Property '${path}' was added with value: ${value}`;
    }

    if (currentNode.type === 'deleted') {
      return `Property '${path}' was removed`;
    }

    if (currentNode.type === 'changed') {
      const [value1, value2] = getValue(currentNode);
      return `Property '${path}' was updated. From ${value1} to ${value2}`;
    }

    return currentNode.children
      .filter((child) => child.type !== 'unchanged')
      .flatMap((child) => iter(child, `${path}.${child.key}`))
      .join('\n');
  };
  return [...tree.filter((node) => node.type !== 'unchanged').flatMap((node) => iter(node, `${node.key}`))].join('\n');
};

export default plain;
