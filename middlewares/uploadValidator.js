module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Check if the request contains files
    if (ctx.request.files) {
      const files = ctx.request.files;

      // Loop through the uploaded files
      for (const key in files) {
        const file = files[key];

        // Validate file MIME type
        if (file.mimetype !== 'application/pdf') {
          return ctx.throw(400, 'Only PDF files are allowed!');
        }
      }
    }

    // Proceed to the next middleware
    await next();
  };
};
