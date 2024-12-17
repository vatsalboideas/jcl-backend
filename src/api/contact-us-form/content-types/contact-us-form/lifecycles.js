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

// const { default: Decrypt } = require('../../../../custom/decrypt');
const dbFuncs = require('../../../../custom/database');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    // freont end decryption

    data.emailID = Decrypt(data.emailID);
    data.firstName = Decrypt(data.firstName);
    data.lastName = Decrypt(data.lastName);
    data.message = Decrypt(data.message);
    data.phoneNumber = Decrypt(data.phoneNumber);
    data.subject = Decrypt(data.subject);

    // databse encryption

    data.firstName = dbFuncs.dbEncrypt(data.firstName);
    data.lastName = dbFuncs.dbEncrypt(data.lastName);
    data.emailID = dbFuncs.dbEncrypt(data.emailID);
    data.phoneNumber = dbFuncs.dbEncrypt(data.phoneNumber);
  },
  afterFindOne(event) {
    const result = event.result;
    result.firstName = dbFuncs.dbDecrypt(result.firstName);
    result.lastName = dbFuncs.dbDecrypt(result.lastName);
    result.emailID = dbFuncs.dbDecrypt(result.emailID);
    result.phoneNumber = dbFuncs.dbDecrypt(result.phoneNumber);
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
      });
    }
  },
  // async afterCreate(event) {
  //   // Connected to "Save" button in admin panel
  //   const { result } = event;

  //   try {
  //     await strapi
  //       .plugin('email')
  //       .service('email')
  //       .send({
  //         // you could also do: await strapi.service('plugin:email.email').send({
  //         to: process.env.FROM_EMAILID,
  //         from: process.env.FROM_EMAILID, // e.g. single sender verification in SendGrid
  //         //   cc: 'valid email address',
  //         //   bcc: 'valid email address',
  //         //   replyTo: 'valid email address',
  //         subject: 'Contact us form submitted',
  //         text: `${result.fieldName} - ${result.lastName}`, // Replace with a valid field ID
  //         html: 'Hello world!',
  //       });
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // },
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;

    try {
      // Prepare the email content
      const emailContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2a2a2a;">Contact Us Form Submission Recieved</h2>
          <p><strong>First Name:</strong> ${result.firstName}</p>
          <p><strong>Last Name:</strong> ${result.lastName}</p>
          <p><strong>Email ID:</strong> ${result.emailID}</p>
          <p><strong>Phone Number:</strong> ${result.phoneNumber}</p>
          <p><strong>Subject:</strong> ${result.subject}</p>
          <p><strong>Message:</strong><br />${result.message}</p>
          <hr />
          <p style="font-size: 0.9em; color: #666;">This email was sent automatically from the Contact Us form submission.</p>
        </div>
      `;

      // Send the email
      await strapi.plugin('email').service('email').send({
        to: process.env.FROM_EMAILID, // Send to the email defined in FROM_EMAILID (could be your admin email)
        from: process.env.FROM_EMAILID, // Sender's email address (can be same as the recipient)
        subject: 'Contact Us Form Submitted',
        html: emailContent, // Use HTML content
      });

      console.log(
        `Email sent successfully to ${process.env.FROM_EMAILID} for ${result.firstName} ${result.lastName}, Contact US form submission`,
      );
      return;
    } catch (err) {
      console.error('Error sending email:', err);
      return;
    }
  },
};
