import _ from 'lodash';

const stringify = (value, depth, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, iterDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = iterDepth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${currentIndent}${key}: ${iter(val, iterDepth + 1)}`,
    );

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, depth);
};

const stylish = (tree, replacer = ' ', spacesCount = 4) => {
  const iter = (currentNode, depth) => {
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const currentIndentWithSymbol = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize);
    let { value } = currentNode;
    let { value1 } = currentNode;
    let { value2 } = currentNode;

    if (_.has(currentNode, 'value') && _.isPlainObject(currentNode.value)) {
      value = stringify(currentNode.value, depth + 1);
    }

    if (_.has(currentNode, 'value1') && _.isPlainObject(currentNode.value1)) {
      value1 = stringify(currentNode.value1, depth + 1);
    }

    if (_.has(currentNode, 'value2') && _.isPlainObject(currentNode.value2)) {
      value2 = stringify(currentNode.value2, depth + 1);
    }

    if (currentNode.type === 'added') {
      return `${currentIndentWithSymbol}+ ${currentNode.key}: ${value}`;
    }

    if (currentNode.type === 'deleted') {
      return `${currentIndentWithSymbol}- ${currentNode.key}: ${value}`;
    }

    if (currentNode.type === 'unchanged') {
      return `${currentIndentWithSymbol}  ${currentNode.key}: ${value}`;
    }

    if (currentNode.type === 'changed') {
      return [
        `${currentIndentWithSymbol}- ${currentNode.key}: ${value1}`,
        `${currentIndentWithSymbol}+ ${currentNode.key}: ${value2}`,
      ];
    }

    if (currentNode.type === 'nested') {
      return [
        `${currentIndent}${currentNode.key}: {`,
        ...currentNode.children.flatMap((child) => iter(child, depth + 1)),
        `${bracketIndent}}`,
      ];
    }
    return ['{', ...currentNode.flatMap((node) => iter(node, depth)), '}'].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
