const crypto = require('crypto-js');

const ALGORITHM = 'aes-256-ctr';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV = process.env.IV;

function encrypt(text) {
  // const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
  // const encrypted = Buffer.concat([
  //   cipher.update(text, 'utf8'),
  //   cipher.final(),
  // ]);
  var encrypted = crypto.AES.encrypt(text, ENCRYPTION_KEY);
  return encrypted;
}

function decrypt(hash) {
  var decrypted = crypto.AES.decrypt(hash, ENCRYPTION_KEY);
  // const decipher = crypto.createDecipheriv(
  //   ALGORITHM,
  //   ENCRYPTION_KEY,
  //   Buffer.from(hash.iv, 'hex'),
  // );
  // const decrypted = Buffer.concat([
  //   decipher.update(Buffer.from(hash.content, 'hex')),
  //   decipher.final(),
  // ]);
  return decrypted.toString(crypto.enc.Utf8);
}

module.exports = {
  dbEncrypt: encrypt,
  dbDecrypt: decrypt,
};
