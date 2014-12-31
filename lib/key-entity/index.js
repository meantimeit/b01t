function KeyEntity() {}

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

module.exports = KeyEntity;
