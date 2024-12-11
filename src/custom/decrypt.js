const forge = require('node-forge');

const privateKeyPem = process.env.RSA_PRIVATE_KEY;

const Decrypt = (encryptedData) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const decrypted = privateKey.decrypt(
    forge.util.decode64(encryptedData),
    'RSAES-PKCS1-V1_5',
  );
  return decrypted;
};

module.exports = Decrypt;
