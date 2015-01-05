var MessageEntity = require('../message-entity');

function EncryptedMessageEntity() {
  MessageEntity.apply(this, arguments);
  delete this._fields;
}

EncryptedMessageEntity.prototype = Object.create(MessageEntity.prototype, {
  constructor: { value: EncryptedMessageEntity }
});

EncryptedMessageEntity.prototype.addFields = function (fields) {
  this._fields = fields;
}

EncryptedMessageEntity.prototype.toJSON = function () {
  var o = {};

  if (this._id) {
    o.id = this._id;
  }

  o.data = this._data;
  o.name = this._name;
  o.userId = this._userId;

  if (this._fields) {
    o.fields = this._fields;
  }

  return o;
};

module.exports = EncryptedMessageEntity;
