var test = require('tape');
var assertThrowsWithMessage = require('../../test-utils').assertThrowsWithMessage;

var DecryptedMessageEntity = require('../../../lib').entity.DecryptedMessageEntity;
var createMessage = require('../../../lib').createMessage;

test('Error when no name passed', function (t) {
  t.plan(2);
  assertThrowsWithMessage(t, createMessage.bind(null), 'No name passed to createMessage');
  assertThrowsWithMessage(t, createMessage.bind(null, null), 'No name passed to createMessage');
});

test('Error when no body passed', function (t) {
  t.plan(2);
  assertThrowsWithMessage(t, createMessage.bind(null, 'Foo'), 'No messageBody passed to createMessage');
  assertThrowsWithMessage(t, createMessage.bind(null, 'Foo', null), 'No messageBody passed to createMessage');
});

test('Error when no userId passed', function (t) {
  t.plan(2);
  assertThrowsWithMessage(t, createMessage.bind(null, 'Foo', 'Some message'), 'No userId passed to createMessage');
  assertThrowsWithMessage(t, createMessage.bind(null, 'Foo', 'Some message', null), 'No userId passed to createMessage');
});

test('Message is instance of DecryptedMessageEntity', function (t) {
  t.plan(2);

  var message = createMessage('Foo', 'Some message', 1, { bar: 'baz' });

  t.ok(message instanceof DecryptedMessageEntity);
  t.deepEqual(message.toJSON(), {
    name: 'Foo',
    data: 'Some message',
    fields: { bar: 'baz' },
    userId: 1
  });
});
