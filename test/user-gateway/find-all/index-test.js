var test = require('tape');
var assertCallbackError = require('../../test-utils/index').assertCallbackError;
var noop = require('../../test-utils/index').noop;

var findAll = require('../../../lib/index').gateway.user.findAll;
var BlankUser = require('../test-doubles/blank-user-entity.js');
var validFindAllDataUserGateway = require('../test-doubles/valid-findall-data-user-gateway.js');
var validUserUserBuilder = require('../test-doubles/valid-user-user-builder.js');

test('Given no user gateway then error', function (t) {
  t.plan(2);

  findAll(null, null, assertCallbackError(t, 'No user gateway provided'));
  findAll(undefined, null, assertCallbackError(t, 'No user gateway provided'));
});

test('Given no user builder then error', function (t) {
  t.plan(2);

  findAll(noop, null, assertCallbackError(t, 'No user builder provided'));
  findAll(noop, undefined, assertCallbackError(t, 'No user builder provided'));
});

test('When error then propagate error', function (t) {
  t.plan(1);

  var userGateway = {
    findAll: function (done) {
      done(new Error('GENERIC FETCH ERROR'));
    }
  };

  findAll(userGateway, noop, assertCallbackError(t, 'GENERIC FETCH ERROR'));
});

test('When successful, pass data to builder', function (t) {
  t.plan(1);

  var userBuilder = function (data) {
    t.deepEqual(data, {
      id: 1,
      name: 'connrs',
      email: 'connrs@example.com'
    });
  };

  findAll(validFindAllDataUserGateway, userBuilder, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(1);
  findAll(validFindAllDataUserGateway, validUserUserBuilder, function (err, data) {
    t.ok(data[0] instanceof BlankUser);
  });
});
