function isMatches(patterns, valueToCheck) {
  return patterns.some((pattern) => {
    const globalMode = pattern.indexOf('*') > -1;
    let matches = false;

    if (globalMode) {
      matches = valueToCheck.startsWith(pattern.split('*')[0]);
    } else if (valueToCheck === pattern) {
      matches = true;
    }

    return matches;
  });
}

module.exports = function _forbiddenImports() {
  return {
    visitor: {
      CallExpression: {
        enter: (nodePath, { opts: { allowedModules = [] } }) => {
          const callee = nodePath.get('callee');

          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            const [arg] = nodePath.get('arguments');

            if (arg && arg.isStringLiteral() && !isMatches(allowedModules, arg.node.value)) {
              throw new Error(`It is not allowed to require "${arg.node.value}" module in this environment.`);
            }
          }
        },
      },

      ImportDeclaration: {
        enter: (nodePath, { opts: { allowedModules = [] } }) => {
          if (!isMatches(allowedModules, nodePath.node.source.value)) {
            throw new Error(`It is not allowed to import "${nodePath.node.source.value}" module in this environment.`);
          }
        },
      },
    },
  };
};
