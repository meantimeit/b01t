function decrypt(crypto, decryptionKeyString, decryptionPassphrase, encryptedMessage, decryptionCompleted) {
  // Call the decryptable interface with the key, passphrase, message and callback
  crypto.decrypt(decryptionKeyString, decryptionPassphrase, encryptedMessage, decryptionCompleted);
}

module.exports = decrypt;
