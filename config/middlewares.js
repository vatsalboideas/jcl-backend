module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3001'],
    },
  },

  // 'strapi::poweredBy',
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Jio Creative Labs',
    },
  },
  'strapi::query',
  'strapi::body',
  // 'strapi::session',
  {
    name: 'strapi::session',
    config: {
      maxAge: 600000,
      http: true,
    },
  },
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'", 'editor.unlayer.com'],
          'frame-src': ["'self'", 'editor.unlayer.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
];
