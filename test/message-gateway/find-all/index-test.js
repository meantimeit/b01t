var test = require('tape');
var assertCallbackError = require('../../test-utils').assertCallbackError;
var noop = require('../../test-utils').noop;

var findAll = require('lib/message-gateway/find-all');
var BlankMessage = require('../test-doubles/blank-message-entity.js');
var validFindAllDataMessageGateway = require('../test-doubles/valid-findall-data-message-gateway.js');
var validMessageMessageBuilder = require('../test-doubles/valid-message-message-builder.js');

test('Given no message gateway then error', function (t) {
  t.plan(2);

  findAll(null, null, assertCallbackError(t, 'No message gateway provided'));
  findAll(undefined, null, assertCallbackError(t, 'No message gateway provided'));
});

test('Given no message builder then error', function (t) {
  t.plan(2);

  findAll(noop, null, assertCallbackError(t, 'No message builder provided'));
  findAll(noop, undefined, assertCallbackError(t, 'No message builder provided'));
});

test('When error then propagate error', function (t) {
  t.plan(1);

  var messageGateway = {
    findAll: function (done) {
      done(new Error('GENERIC FETCH ERROR'));
    }
  };

  findAll(messageGateway, noop, assertCallbackError(t, 'GENERIC FETCH ERROR'));
});

test('When successful, pass data to builder', function (t) {
  t.plan(1);

  var messageBuilder = function (data) {
    t.deepEqual(data, {
      id: 1,
      type: 'Url',
      name: 'Example message',
      url: 'http://example.com',
      data: 'HERE BE DRAGONS'
    });
  };

  findAll(validFindAllDataMessageGateway, messageBuilder, noop);
});

test('Data sent to builder returned to callback', function (t) {
  t.plan(1);
  findAll(validFindAllDataMessageGateway, validMessageMessageBuilder, function (err, data) {
    t.ok(data[0] instanceof BlankMessage);
  });
});
