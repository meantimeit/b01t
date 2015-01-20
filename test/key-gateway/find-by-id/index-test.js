var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamIsFunction = require('../../test-utils').assertParamIsFunction;
var assertParamInstanceOf = require('../../test-utils').assertParamInstanceOf;
var assertParamEqual = require('../../test-utils').assertParamEqual;
var noop = require('../../test-utils').noop;

var validKeyGateway = require('./../test-doubles/valid-data-key-gateway.js');
var BlankKey = require('../test-doubles/blank-key-entity.js');
var keyBuilder = require('../../../lib').builder.key;

var findById = require('../../../lib').gateway.key.findById;

test('When key gateway not set then return error', function (t) {
  t.plan(2);
  findById(null, null, null, assertErrorMessage(t, 'No key gateway provided'));
  findById(undefined, null, null, assertErrorMessage(t, 'No key gateway provided'));
});

test('When builder not set then return error', function (t) {
  t.plan(2);
  var stubGateway = {};
  findById(stubGateway, null, null, assertErrorMessage(t, 'No key builder provided'));
  findById(stubGateway, undefined, null, assertErrorMessage(t, 'No key builder provided'));
});

test('when id not set then return error', function (t) {
  t.plan(2);
  var dummyGateway = {};
  var dummyBuilder = noop;
  findById(dummyGateway, dummyBuilder, null, assertErrorMessage(t, 'No ID provided'));
  findById(dummyGateway, dummyBuilder, undefined, assertErrorMessage(t, 'No ID provided'));
});

test('When id is set pass id to key gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: assertParamEqual(t, 1, 1) };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass callback to key gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: function (id, done) { assertParamIsFunction(t, done); } };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass data to builder', function (t) {
  t.plan(1);
  var keyBuilder = assertParamEqual(t, 1, {
    id: 1,
    type: 'public',
    key: 'HEREBEDRAGONS',
    userId: 1
  });
  findById(validKeyGateway, keyBuilder, 1, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(1);
  findById(validKeyGateway, keyBuilder, 1, assertParamInstanceOf(t, 2, BlankKey));
});
