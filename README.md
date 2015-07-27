# is-outdated [![Build Status](https://travis-ci.org/rogeriopvl/is-outdated.svg?branch=master)](https://travis-ci.org/rogeriopvl/is-outdated)

This is a simple node module that tells you when the installed version of a node package (i.e app) is outdated.

**Note:** if you need a more complete solution check out [update-notifier](https://www.npmjs.com/package/update-notifier).

## Install

    npm install --save is-outdated

## Usage

```javascript
var isOutdated = require('is-outdated');

isOutdated('mypackage', require('./package.json').version, function (err, res) {
    console.log('The latest version of this app is %s', res.version);
    console.log('Please updated it with: npm update -g mypackage');
});
```

## API

`isOutdated(name, version, callback)`

* name (string) the name of the package
* version (string) a semver compatible string
* callback (function)
    * err
    * data - `false` when the package is up to date or an object in the form: `{ version: 'x.x.x' }`

## License

MIT
