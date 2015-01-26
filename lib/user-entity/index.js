var Entity = require('../entity');

function UserEntity() {
  Entity.apply(this, arguments);
}

UserEntity.prototype = Object.create(Entity.prototype, {
  constructor: { value: UserEntity }
});

UserEntity.prototype.setName = function (name) {
  this._name = name;
};

UserEntity.prototype.setEmail = function (email) {
  this._email = email;
};

UserEntity.prototype.getName = function () {
  return this._name;
};

UserEntity.prototype.getEmail = function () {
  return this._email;
};

UserEntity.prototype.toJSON = function () {
  var data = {};

  if (this.getId()) {
    data.id = this.getId();
  }

  data.name = this.getName();
  data.email = this.getEmail();

  return data;
};

module.exports = UserEntity;