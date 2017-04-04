## babel-plugin-forbidden-imports

[![Build Status](https://img.shields.io/travis/handsontable/babel-plugin-forbidden-imports.svg?style=flat-square)](https://travis-ci.org/handsontable/babel-plugin-forbidden-imports)
[![NPM](https://img.shields.io/npm/v/babel-plugin-forbidden-imports.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-forbidden-imports)
[![Dependencies](https://img.shields.io/david/handsontable/babel-plugin-forbidden-imports.svg?style=flat-square)](https://david-dm.org/handsontable/babel-plugin-forbidden-imports)
[![License](https://img.shields.io/npm/l/babel-plugin-forbidden-imports.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-forbidden-imports)

This is a Babel plugin for static import/require modules checking. Any imported modules (using import or require) by default are forbidden. This plugin
can be helpful in situations when you want to forbidden for using specific modules in your environment.

# Installation

Install via [npm](https://npmjs.org/package/babel-plugin-forbidden-imports).
```sh
npm install --save-dev babel-plugin-forbidden-imports
```

# Configuration

Configure it in your babelrc file (`.babelrc`).

```js
{
  "env": {
    "node": {
      "plugins": [
        [
          "babel-plugin-forbidden-imports",
          {
            allowedModules: ["./my-local-module", "lodash/*"]
          }
        ]
      ]
    }
  }
}

```

or use with `babel-register`

```
require('babel-register')({
  plugins: [
    [
      'babel-plugin-forbidden-imports',
      {
        allowedModules: ["./my-local-module", "lodash/*"]
      }
    ]
  ]
});

```

## License

[MIT License](http://opensource.org/licenses/MIT)
