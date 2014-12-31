var Entity = require('../entity');

function UserEntity() {
  Entity.apply(this, arguments);
}

UserEntity.prototype = Object.create(Entity.prototype, {
  constructor: { value: UserEntity }
});

UserEntity.prototype.setName = function (name) {
  this._name = name;
}

UserEntity.prototype.setEmail = function (email) {
  this._email = email;
}

UserEntity.prototype.getName = function () {
  return this._name;
}

UserEntity.prototype.getEmail = function () {
  return this._email;
}

module.exports = UserEntity;