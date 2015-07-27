var test = require('tape');
var mockery = require('mockery');

// Mock the latest-version module
var latestVersionMock = function (name, cb) {
  if (name === 'fakepackage') {
    return cb(new Error('Not found'));
  }
  return cb(null, '2.0.0');
};

mockery.enable({ warnOnUnregistered: false });
mockery.registerMock('latest-version', latestVersionMock);

var isOutdated = require('../');

test('is-outdated exists as a function', function (t) {
  t.equal(typeof isOutdated, 'function');
  t.end();
});

test('given a package name and inferior version should return and object with version', function (t) {
  t.plan(4);
  isOutdated('mypackage', '1.0.0', function (err, data) {
    t.error(err);
    t.ok(data);
    t.equal(typeof data, 'object');
    t.deepEqual(data, { version: '2.0.0' });
  });
});

test('given a package name and equal or superior version should return false', function (t) {
  t.plan(2);
  isOutdated('mypackage', '3.0.0', function (err, data) {
    t.error(err);
    t.notOk(data);
  });
});

test('given an inexistent package passes error to callback', function (t) {
  t.plan(3);
  isOutdated('fakepackage', '1.0.0', function (err, data) {
    t.ok(err);
    t.ok(err instanceof Error);
    t.notOk(data);
  });
});
