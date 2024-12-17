// module.exports = {
//     async afterCreate(event) {
//       const { result } = event;
//       console.log(result, "emailresule")
//       try {
//         await strapi.plugins['email'].services.email.send({
//           to: result.emailID,
//           from: process.env.FROM_EMAILID,
//           subject: `This is a test mail`,
//           html: `Hello world ${result.name}` //<- (you'll need a name field in strapi collection type to display this data)
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   };
const Decrypt = require('../../../../custom/decrypt');

const dbFuncs = require('../../../../custom/database');

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    // front end decryption

    data.emailID = Decrypt(data.emailID);
    data.firstName = Decrypt(data.firstName);
    data.lastName = Decrypt(data.lastName);
    data.message = Decrypt(data.message);
    data.phoneNumber = Decrypt(data.phoneNumber);
    data.portfolioLink = Decrypt(data.portfolioLink);

    // databse encryption

    data.firstName = dbFuncs.dbEncrypt(data.firstName);
    data.lastName = dbFuncs.dbEncrypt(data.lastName);
    data.emailID = dbFuncs.dbEncrypt(data.emailID);
    data.phoneNumber = dbFuncs.dbEncrypt(data.phoneNumber);
    data.portfolioLink = dbFuncs.dbEncrypt(data.portfolioLink);
  },
  afterFindOne(event) {
    const result = event.result;
    result.firstName = dbFuncs.dbDecrypt(result.firstName);
    result.lastName = dbFuncs.dbDecrypt(result.lastName);
    result.emailID = dbFuncs.dbDecrypt(result.emailID);
    result.phoneNumber = dbFuncs.dbDecrypt(result.phoneNumber);
    result.portfolioLink = dbFuncs.dbDecrypt(result.portfolioLink);
    // console.log(dbFuncs.dbDecrypt(result.firstName), 'data');
  },

  afterFindMany(event) {
    const result = event.result;

    if (result.length > 0) {
      result.forEach((item) => {
        if (item.firstName) item.firstName = dbFuncs.dbDecrypt(item.firstName);
        if (item.lastName) item.lastName = dbFuncs.dbDecrypt(item.lastName);
        if (item.emailID) item.emailID = dbFuncs.dbDecrypt(item.emailID);
        if (item.phoneNumber)
          item.phoneNumber = dbFuncs.dbDecrypt(item.phoneNumber);
        if (item.portfolioLink)
          item.portfolioLink = dbFuncs.dbDecrypt(item.portfolioLink);
      });
    }
  },

  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;

    try {
      await strapi
        .plugin('email')
        .service('email')
        .send({
          // you could also do: await strapi.service('plugin:email.email').send({
          to: result.emailID,
          from: process.env.FROM_EMAILID, // e.g. single sender verification in SendGrid
          //   cc: 'valid email address',
          //   bcc: 'valid email address',
          //   replyTo: 'valid email address',
          subject: 'Career form submitted successfully !',
          text: `${result.fieldName} - ${result.lastName}`, // Replace with a valid field ID
          html: 'Hello world!',
        });
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  },
};
