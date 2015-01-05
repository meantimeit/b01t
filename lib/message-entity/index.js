var Entity = require('../entity');

function MessageEntity() {
  Entity.apply(this, arguments);
  this._fields = {};
}

MessageEntity.prototype = Object.create(Entity.prototype, {
  constructor: { value: MessageEntity }
})

MessageEntity.prototype.setName = function (name) {
  this._name = name;
};

MessageEntity.prototype.setData = function (data) {
  this._data = data;
};

MessageEntity.prototype.setUserId = function (userId) {
  this._userId = userId;
}

MessageEntity.prototype.addField = function (key, value) {
  this._fields[key] = value;
};

MessageEntity.prototype.addFields = function (fields) {
  var f;

  for (f in fields) {
    if (fields.hasOwnProperty(f)) {
      this.addField(f, fields[f]);
    }
  }
};

MessageEntity.prototype.getName = function () {
  return this._name;
}

MessageEntity.prototype.getData = function () {
  return this._data;
};

MessageEntity.prototype.getUserId = function () {
  return this._userId;
}

MessageEntity.prototype.getFields = function () {
  return this._fields;
}

MessageEntity.prototype.toJSON = function () {
  var o = {};

  if (this._id) {
    o.id = this._id;
  }

  o.data = this._data;
  o.name = this._name;
  o.userId = this._userId;
  o.fields = this._fields;

  return o;
};

module.exports = MessageEntity;
