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


module.exports = {
    async afterCreate(event) {    // Connected to "Save" button in admin panel
        const { result } = event;

        try{
            await strapi.plugin('email').service('email').send({ // you could also do: await strapi.service('plugin:email.email').send({
              to: result.emailID,
              from: process.env.FROM_EMAILID, // e.g. single sender verification in SendGrid
            //   cc: 'valid email address',
            //   bcc: 'valid email address',
            //   replyTo: 'valid email address',
              subject: 'The Strapi Email plugin worked successfully',
              text: `${result.fieldName} - ${result.lastName}`, // Replace with a valid field ID
              html: 'Hello world!', 
                
            })
            return
        } catch(err) {
            console.log(err);
            return
        }
    }
}
