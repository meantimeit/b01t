var EncryptedMessageEntity = require('../../encrypted-message-entity');

function remove(messageGateway, message, done) {
  if (messageGateway === null || messageGateway === undefined) {
    return done(new Error('No message gateway provided'));
  }

  if (message === null || message === undefined) {
    return done(new Error('No message provided'));
  }

  if (!(message instanceof EncryptedMessageEntity)) {
    return done(new Error('Not a MessageEntity'));
  }

  if (!message.getId()) {
    return done(new Error('MessageEntity has no ID'));
  }

  messageGateway.remove(message.getId(), function (err) {
    if (err) {
      return done(err);
    }

    done();
  });
}

module.exports = remove;