var test = require('tape');
var assertErrorMessage = require('../../test-utils/index').assertErrorMessage;
var assertParamIsFunction = require('../../test-utils/index').assertParamIsFunction;
var assertParamInstanceOf = require('../../test-utils/index').assertParamInstanceOf;
var assertParamEqual = require('../../test-utils/index').assertParamEqual;
var noop = require('../../test-utils/index').noop;

var validUserGateway = require('./../test-doubles/valid-data-user-gateway.js');
var userBuilder = require('../../../lib').builder.user;
var UserEntity = require('../../../lib').entity.UserEntity;

var findById = require('../../../lib/index').gateway.user.findById;

test('When user gateway not set then return error', function (t) {
  t.plan(2);
  findById(null, null, null, assertErrorMessage(t, 'No user gateway provided'));
  findById(undefined, null, null, assertErrorMessage(t, 'No user gateway provided'));
});

test('When builder not set then return error', function (t) {
  t.plan(2);
  var stubGateway = {};
  findById(stubGateway, null, null, assertErrorMessage(t, 'No user builder provided'));
  findById(stubGateway, undefined, null, assertErrorMessage(t, 'No user builder provided'));
});

test('when id not set then return error', function (t) {
  t.plan(2);
  var dummyGateway = {};
  var dummyBuilder = noop;
  findById(dummyGateway, dummyBuilder, null, assertErrorMessage(t, 'No ID provided'));
  findById(dummyGateway, dummyBuilder, undefined, assertErrorMessage(t, 'No ID provided'));
});

test('When id is set pass id to user gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: assertParamEqual(t, 1, 1) };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass callback to user gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: function (id, done) { assertParamIsFunction(t, done); } };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass data to builder', function (t) {
  t.plan(1);
  var userBuilder = assertParamEqual(t, 1, {
    id: 1,
    name: 'connrs',
    email: 'connrs@example.com'
  });
  findById(validUserGateway, userBuilder, 1, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(2);

  findById(validUserGateway, userBuilder, 1, assertParamInstanceOf(t, 2, UserEntity));
  findById(validUserGateway, userBuilder, 1, function (err, user) {
    t.deepEqual(user.toJSON(), {
      id: 1,
      name: 'connrs',
      email: 'connrs@example.com'
    });
  });
});
