// 'use strict';

// /**
//  * contact-us-form service
//  */

// const { createCoreService } = require('@strapi/strapi').factories;

// module.exports = createCoreService('api::contact-us-form.contact-us-form');

'use strict';

/**
 * contact-us-form service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::contact-us-form.contact-us-form',
  ({ strapi }) => ({
    // Custom function to delete old records
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

      try {
        // Delete records older than 45 days
        const result = await strapi.db
          .query('api::contact-us-form.contact-us-form')
          .deleteMany({
            where: {
              createdAt: { $lt: fortyFiveDaysAgo },
              // for testing
              // createdAt: { $lt: fortyFiveDaysAgo },
            },
          });

        console.log(
          `${result.count} old contact us form records deleted successfully.`,
        );
      } catch (err) {
        console.error('Error deleting contact us form old records:', err);
      }
    },
  }),
);
