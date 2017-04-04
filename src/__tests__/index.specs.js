/* global expect test */
import * as babel from 'babel-core';
import babelPluginForbiddenImports from '../.';

function trimLines(str) {
  return str.replace(/^\n+|\n+$/, '').replace(/\n+/g, '\n');
}

const babelInit = (babelOptions = {}) => (input) => {
  const code = babel.transform(input, babelOptions).code;

  return trimLines(code);
};

const transform = babelInit({
  plugins: [
    [
      babelPluginForbiddenImports,
      {
        allowedModules: ['npm-module', './local-module', 'npm-glob/*', './local-glob/deep/*'],
      },
    ],
  ],
});

// import
test('should throw an exception for not allowed npm module when used import expression', () => {
  expect(() => {
    transform('import "window"');
  }).toThrow('It is not allowed to import "window" module in this environment.');
});

test('should throw an exception for not allowed npm module when used import expression (default import)', () => {
  expect(() => {
    transform('import window from "window"');
  }).toThrow('It is not allowed to import "window" module in this environment.');
});

test('should throw an exception for not allowed npm module when used import expression (named import)', () => {
  expect(() => {
    transform('import {window} from "window"');
  }).toThrow('It is not allowed to import "window" module in this environment.');
});

test('should throw an exception for not allowed local module when used import expression', () => {
  expect(() => {
    transform('import "./window.js"');
  }).toThrow('It is not allowed to import "./window.js" module in this environment.');
});

test('should throw an exception for not allowed local module when used import expression (default import)', () => {
  expect(() => {
    transform('import window from "./window.js"');
  }).toThrow('It is not allowed to import "./window.js" module in this environment.');
});

test('should throw an exception for not allowed local module when used import expression (named import)', () => {
  expect(() => {
    transform('import {window} from "./window.js"');
  }).toThrow('It is not allowed to import "./window.js" module in this environment.');
});

test('should throw an exception for not allowed local submodule when used import expression', () => {
  expect(() => {
    transform('import {window} from "./local-glob/deeeeeep/submodule"');
  }).toThrow('It is not allowed to import "./local-glob/deeeeeep/submodule" module in this environment.');
});

test('should allow using npm module when used import expression', () => {
  expect(transform('import "npm-module"')).toBe('import "npm-module";');
});

test('should allow using local module when used import expression', () => {
  expect(transform('import "./local-module"')).toBe('import "./local-module";');
});

test('should allow using npm submodule when used import expression', () => {
  expect(transform('import "npm-glob/some/module"')).toBe('import "npm-glob/some/module";');
});

test('should allow using local submodule when used import expression', () => {
  expect(transform('import "./local-glob/deep/module/submodule"')).toBe('import "./local-glob/deep/module/submodule";');
});

// require
test('should throw an exception for not allowed npm module when used require expression', () => {
  expect(() => {
    transform('require("window")');
  }).toThrow('It is not allowed to require "window" module in this environment.');
});

test('should throw an exception for not allowed npm module when used require expression with variable assignment', () => {
  expect(() => {
    transform('const window = require("window")');
  }).toThrow('It is not allowed to require "window" module in this environment.');
});

test('should allow using npm module when used require expression', () => {
  expect(transform('require("npm-module")')).toBe('require("npm-module");');
});

test('should allow using local module when used require expression', () => {
  expect(transform('require("./local-module")')).toBe('require("./local-module");');
});

test('should allow using npm submodule when used require expression', () => {
  expect(transform('require("npm-glob/some/module")')).toBe('require("npm-glob/some/module");');
});

test('should allow using local submodule when used require expression', () => {
  expect(transform('require("./local-glob/deep/module/submodule")')).toBe('require("./local-glob/deep/module/submodule");');
});
