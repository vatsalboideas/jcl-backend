module.exports = {
  // Runs daily at 2 am
  '0 0 02 * * *': async ({ strapi }) => {
    try {
      console.log('Running deleteOldRecords cron job...');
      await strapi.service('api::career-form.career-form').deleteOldRecords();
      await strapi
        .service('api::contact-us-form.contact-us-form')
        .deleteOldRecords();
      console.log('Cron job completed successfully.');
    } catch (err) {
      console.error('Cron job failed:', err);
    }
  },
};
