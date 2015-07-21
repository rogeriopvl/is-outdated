# is-outdated

This is a simple node module that tells you when the installed version of a node package (i.e app) is outdated.

## Install

    npm install --save is-outdated

## Usage

    var isOutdated = require('is-outdated');

    isOutdated('mypackage', require('./package.json').version, function (err, outdated) {
        console.log(outdated);
    });

## API

`isOutdated(name, version, callback)`

* name (string) the name of the package
* version (string) a semver compatible string
* callback (function)
    * err
    * data - `false` when the package is not outdated or an object in the form: `{ version: 'x.x.x' }`

## License

MIT
