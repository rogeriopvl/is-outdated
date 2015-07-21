var test = require('tape');
var isOutdated = require('../');

test('annoyer exists as a function', function (t) {
  t.plan(1);
  t.ok(typeof isOutdated === 'function');
});

test('given a package name and inferior version should return and object with version', function (t) {
  t.plan(3);
  isOutdated('windrose', '1.0.0', function (err, data) {
    t.error(err);
    t.ok(data);
    t.equal(Object.keys(data)[0], 'version');
  });
});

test('given a package name and equal or superior version should return false', function (t) {
  t.plan(2);
  isOutdated('windrose', '3.0.0', function (err, data) {
    t.error(err);
    t.notOk(data);
  });
});
