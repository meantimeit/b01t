var test = require('tape');
var assertErrorMessage = require('../../test-utils').assertErrorMessage;
var assertParamIsFunction = require('../../test-utils').assertParamIsFunction;
var assertParamInstanceOf = require('../../test-utils').assertParamInstanceOf;
var assertParamEqual = require('../../test-utils').assertParamEqual;
var noop = require('../../test-utils').noop;

var validMessageGateway = require('./../test-doubles/valid-data-message-gateway.js');
var BlankMessage = require('../test-doubles/blank-message-entity.js');
var validMessageMessageBuilder = require('../test-doubles/valid-message-message-builder.js');

var findById = require('../../../lib').gateway.message.findById;

test('When message gateway not set then return error', function (t) {
  t.plan(2);
  findById(null, null, null, assertErrorMessage(t, 'No message gateway provided'));
  findById(undefined, null, null, assertErrorMessage(t, 'No message gateway provided'));
});

test('When builder not set then return error', function (t) {
  t.plan(2);
  var stubGateway = {};
  findById(stubGateway, null, null, assertErrorMessage(t, 'No message builder provided'));
  findById(stubGateway, undefined, null, assertErrorMessage(t, 'No message builder provided'));
});

test('when id not set then return error', function (t) {
  t.plan(2);
  var dummyGateway = {};
  var dummyBuilder = noop;
  findById(dummyGateway, dummyBuilder, null, assertErrorMessage(t, 'No ID provided'));
  findById(dummyGateway, dummyBuilder, undefined, assertErrorMessage(t, 'No ID provided'));
});

test('When id is set pass id to message gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: assertParamEqual(t, 1, 1) };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass callback to message gateway', function (t) {
  t.plan(1);
  var stubGateway = { findById: function (id, done) { assertParamIsFunction(t, done); } };
  var dummyBuilder = noop;
  findById(stubGateway, dummyBuilder, 1, noop);
});

test('When id is set pass data to builder', function (t) {
  t.plan(1);
  var messageBuilder = assertParamEqual(t, 1, {
    id: 1,
    type: 'Url',
    name: 'Example message',
    url: 'http://example.com',
    data: 'HERE BE DRAGONS'
  });
  findById(validMessageGateway, messageBuilder, 1, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(1);
  findById(validMessageGateway, validMessageMessageBuilder, 1, assertParamInstanceOf(t, 2, BlankMessage));
});
