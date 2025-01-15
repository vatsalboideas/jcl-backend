module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Override headers after the response
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:5174'); // Explicit origin
    ctx.set('Access-Control-Allow-Credentials', 'true');
  };
};
