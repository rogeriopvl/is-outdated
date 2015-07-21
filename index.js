var semver = require('semver');

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
