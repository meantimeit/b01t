var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamIsFunction = require('../../test-utils').assertParamIsFunction;
var assertParamInstanceOf = require('../../test-utils').assertParamInstanceOf;
var assertParamEqual = require('../../test-utils').assertParamEqual;
var noop = require('../../test-utils').noop;

var validKeyGateway = require('./../test-doubles/valid-data-key-gateway.js');
var BlankKey = require('../test-doubles/blank-key-entity.js');
var keyBuilder = require('../../../lib').builder.key;

var findByUserId = require('../../../lib').gateway.key.findByUserId;

test('When key gateway not set then return error', function (t) {
  t.plan(2);
  findByUserId(null, null, null, assertErrorMessage(t, 'No key gateway provided'));
  findByUserId(undefined, null, null, assertErrorMessage(t, 'No key gateway provided'));
});

test('When builder not set then return error', function (t) {
  t.plan(2);
  var stubGateway = {};
  findByUserId(stubGateway, null, null, assertErrorMessage(t, 'No key builder provided'));
  findByUserId(stubGateway, undefined, null, assertErrorMessage(t, 'No key builder provided'));
});

test('when id not set then return error', function (t) {
  t.plan(2);
  var dummyGateway = {};
  var dummyBuilder = noop;
  findByUserId(dummyGateway, dummyBuilder, null, assertErrorMessage(t, 'No user ID provided'));
  findByUserId(dummyGateway, dummyBuilder, undefined, assertErrorMessage(t, 'No user ID provided'));
});

test('When id is set pass id to key gateway', function (t) {
  t.plan(1);
  var stubGateway = { findByUserId: assertParamEqual(t, 1, 1) };
  var dummyBuilder = noop;
  findByUserId(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass callback to key gateway', function (t) {
  t.plan(1);
  var stubGateway = { findByUserId: function (id, done) { assertParamIsFunction(t, done); } };
  var dummyBuilder = noop;
  findByUserId(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass data to builder', function (t) {
  t.plan(1);
  var keyBuilder = assertParamEqual(t, 1, {
    id: 1,
    type: 'public',
    key: 'HEREBEDRAGONS',
    userId: 1
  });
  findByUserId(validKeyGateway, keyBuilder, 1, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(1);
  findByUserId(validKeyGateway, keyBuilder, 1, assertParamInstanceOf(t, 2, BlankKey));
});
