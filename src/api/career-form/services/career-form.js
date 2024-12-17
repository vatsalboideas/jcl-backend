// 'use strict';

// /**
//  * career-form service
//  */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::career-form.career-form');

'use strict';

/**
 * career-form service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::career-form.career-form',
  ({ strapi }) => ({
    // Custom function to delete old records
    // async deleteOldRecords() {
    //   const currentDate = new Date();
    //   const fortyFiveDaysAgo = new Date(
    //     currentDate.setDate(currentDate.getDate() - 45),
    //   );

    //   // for testing

    //   // const fiveMinutesAgo = new Date(
    //   //   currentDate.setMinutes(currentDate.getMinutes() - 5),
    //   // );
    //   // const fiveSecondsAgo = new Date(
    //   //   currentDate.setSeconds(currentDate.getSeconds() - 5),
    //   // );

    //   try {
    //     // Delete records older than 45 days
    //     const result = await strapi.db
    //       .query('api::career-form.career-form')
    //       .deleteMany({
    //         where: {
    //           createdAt: { $lt: fortyFiveDaysAgo },
    //           // for testing
    //           // createdAt: { $lt: fortyFiveDaysAgo },
    //         },
    //       });

    //     console.log(
    //       `${result.count} old career form records deleted successfully.`,
    //     );
    //   } catch (err) {
    //     console.error('Error deleting old career form records:', err);
    //   }
    // },
    async deleteOldRecords() {
      const currentDate = new Date();

      const fortyFiveDaysAgo = new Date(
        currentDate.setDate(currentDate.getDate() - 45),
      );

      // for testing

      // const fiveMinutesAgo = new Date(
      //   currentDate.setMinutes(currentDate.getMinutes() - 5),
      // );
      // const fiveSecondsAgo = new Date(
      //   currentDate.setSeconds(currentDate.getSeconds() - 5),
      // );

      console.log('Deleting records created before:', fortyFiveDaysAgo);

      try {
        // Step 1: Fetch records older than 5 seconds with 'resume' relation
        const oldRecords = await strapi.db
          .query('api::career-form.career-form')
          .findMany({
            select: ['id'],
            populate: {
              resume: true, // Fetch the media associated with the resume field
            },
            where: {
              createdAt: { $lt: fortyFiveDaysAgo },
            },
          });

        console.log('Old Records Found:', oldRecords);

        // Step 2: Check if file exists, then delete associated media files
        for (const record of oldRecords) {
          if (record.resume && record.resume.id) {
            const fileId = record.resume.id;

            // Fetch the file to check its existence
            const fileExists = await strapi.plugins[
              'upload'
            ].services.upload.findOne({
              id: fileId,
            });

            if (fileExists) {
              // File exists, delete it
              await strapi.plugins['upload'].services.upload.remove({
                id: fileId,
              });
              console.log(`Deleted resume file with ID: ${fileId}`);
            } else {
              console.log(`File with ID: ${fileId} does not exist. Skipping.`);
            }
          }
        }

        // Step 3: Delete the records
        const result = await strapi.db
          .query('api::career-form.career-form')
          .deleteMany({
            where: {
              createdAt: { $lt: fortyFiveDaysAgo },
            },
          });

        console.log(
          `${result.count} old career form records and their associated files deleted successfully.`,
        );
      } catch (err) {
        console.error(
          'Error deleting old career form records or associated files:',
          err,
        );
      }
    },
  }),
);
