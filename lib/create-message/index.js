var DecryptedMessageEntity = require('../decrypted-message-entity');

function createMessage(name, messageBody, userId, fields) {
  if (name === null || name === undefined) {
    throw new Error('No name passed to createMessage');
  }

  if (messageBody === null || messageBody === undefined) {
    throw new Error('No messageBody passed to createMessage');
  }

  if (userId === null || userId === undefined) {
    throw new Error('No userId passed to createMessage');
  }

  var message = new DecryptedMessageEntity();

  message.setName(name);
  message.setData(messageBody);
  message.setUserId(userId);
  message.addFields(fields);

  return message;
}

module.exports = createMessage;
