var test = require('tape');
var mockery = require('mockery');
var isOutdated = require('../');

// Mock the npm module
var npmMock = {
  load: function (opts, cb) {
    return cb();
  },
  commands: {
    info: function (args, silent, cb) {
      return cb(null, { '2.0.0': { version: '2.0.0' }});
    }
  }
};
mockery.registerMock('npm', npmMock);

test('is-outdated exists as a function', function (t) {
  t.ok(typeof isOutdated === 'function');
  t.end();
});

test('given a package name and inferior version should return and object with version', function (t) {
  mockery.enable();
  t.plan(3);
  isOutdated('mypackage', '1.0.0', function (err, data) {
    t.error(err);
    t.ok(data);
    t.equal(Object.keys(data)[0], 'version');
  });
  t.on('end', mockery.disable);
});

test('given a package name and equal or superior version should return false', function (t) {
  mockery.enable();

  t.plan(2);
  isOutdated('mypackage', '3.0.0', function (err, data) {
    t.error(err);
    t.notOk(data);
  });
  t.on('end', mockery.disable);
});
