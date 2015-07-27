var latestVersion  = require('latest-version');
var semver = require('semver');

/**
 * Checks if a version of a given package is outdated
 *
 * @param name {string} the name of the package
 * @param version {string} the version of the currently installed package
 * @param cb {function} the callback function
 *    returns false if it's up to date, and { version: 'x.x.x' } if outdated,
 *    being the version key the latest version available
 */
module.exports = function (name, version, cb) {
  latestVersion(name, function (err, v) {
    if (err) { return cb(err); }

    if (semver.lt(version, v)) {
      return cb(null, { version: v });
    }
    return cb(null, false);
  });
};
