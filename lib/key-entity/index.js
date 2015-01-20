function KeyEntity() {
  this._type = null;
}

KeyEntity.prototype.setId = function (id) {
  this._id = id;
}

KeyEntity.prototype.getId = function () {
  return this._id;
}

KeyEntity.prototype.getCipher = function () {
  return this._cipher;
};
KeyEntity.prototype.setCipher = function (cipher) {
  this._cipher = cipher;
};
KeyEntity.prototype.getUserId = function () {
  return this._userId;
};
KeyEntity.prototype.setUserId = function (userId) {
  this._userId = userId;
}

KeyEntity.prototype.toJSON = function () {
  return {
    id: this.getId(),
    key: this.getCipher(),
    userId: this.getUserId(),
    type: this._type
  }
};

module.exports = KeyEntity;
