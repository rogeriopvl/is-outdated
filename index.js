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
  var npm = require('npm');
  npm.load({}, function () {
    npm.commands.info([name, 'version'], true, function (err, data) {
      if (err) { return cb(err); }

      var currentVersion = Object.keys(data)[0];

      if (semver.lt(version, currentVersion)) {
        return cb(null, data[currentVersion]);
      } else {
        return cb(null, false);
      }
    });
  })
};
