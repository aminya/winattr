# winattr [![NPM Version][npm-image]][npm-url] [![Linux Build][travis-image]][travis-url] [![Windows Build][appveyor-image]][appveyor-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Monitor][greenkeeper-image]][greenkeeper-url]

> Foolproof Windows® file attributes for Node.js

Get and set:
* `archive`
* `hidden`
* `readonly`
* `system`

… on files and/or directories.

A native binding is used, offering great performance. As a contingency in case that fails, functionality will silently revert to a command line, though it is considerably slower.


## Installation

It may go without saying, but this library is not intended to run on anything other than Windows.

[Node.js](http://nodejs.org/) `>= 8` is required. To install, type this at the command line:
```
npm install winattr
```


## Methods

### `get(path: string): Promise<Attributes>`
`path` - Path to file or directory  
```js
const attrs = await winattr.get('path/to/file.ext')
console.log(attrs)
```

### `getSync(path: string): Attributes`
`path` - Path to file or directory  

Returns an `Object` or throws an error if the file or dir cannot be found/accessed.
```js
const attrs = winattr.getSync('path/to/file.ext');

console.log(attrs);
```

### `set(path: string, attrs: Attributes): Promise<void>`
`path` - Path to file or directory  
`attrs` - An object containing attributes to change  
```js
await winattr.set('path/to/folder/', {readonly:true})  
```

### `setSync(path, attrs)`
`path` - Path to file or directory  
`attrs` - An object containing attributes to change  

Throws an error if the file or dir cannot be found/accessed.
```js
winattr.setSync('path/to/folder/', {readonly:true});
```

### `Attributes` type:
```typescript
interface Attributes {
  archive: boolean
  hidden: boolean
  readonly: boolean
  system: boolean
}
```

[npm-image]: https://img.shields.io/npm/v/winattr.svg
[npm-url]: https://npmjs.com/package/winattr
[travis-image]: https://img.shields.io/travis/stevenvachon/winattr.svg?label=linux
[travis-url]: https://travis-ci.org/stevenvachon/winattr
[appveyor-image]: https://img.shields.io/appveyor/ci/stevenvachon/winattr.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/stevenvachon/winattr
[coveralls-image]: https://img.shields.io/coveralls/stevenvachon/winattr.svg
[coveralls-url]: https://coveralls.io/github/stevenvachon/winattr
[greenkeeper-image]: https://badges.greenkeeper.io/stevenvachon/winattr.svg
[greenkeeper-url]: https://greenkeeper.io/
