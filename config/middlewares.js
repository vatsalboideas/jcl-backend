module.exports = [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::poweredBy',
  // {
  //   name: 'strapi::cors',
  //   config: {
  //     origin: ['http://localhost:3001'],
  //     credentials: false,
  //   },
  // },
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Jio Creative Labs',
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: 'http://localhost:3002', // Set to your frontend origin
      credentials: false, // Allow credentials (cookies, tokens, etc.)
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      maxAge: 31536000,
      keepHeadersOnError: false,
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
      rolling: false,
    },
  },
  'strapi::favicon',
  'strapi::public',
  // 'strapi::security',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io'],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // {
  //   name: 'strapi::ip',
  //   config: {
  //     // whitelist: ['192.168.0.*', '192.168.1.*', '123.123.123.123'],
  //     // blacklist: ['1.116.*.*', '103.54.*.*'],
  //     whitelist: ['http://localhost:1337', '127.0.0.1:1337'],
  //     // blacklist: ['1.116.*.*', '103.54.*.*'],
  //   },
  // },
  // {
  //   name: 'strapi::security',
  //   config: {
  //     contentSecurityPolicy: {
  //       useDefaults: true,
  //       directives: {
  //         'script-src': ["'self'", "'unsafe-inline'", 'editor.unlayer.com'],
  //         'frame-src': ["'self'", 'editor.unlayer.com'],
  //         upgradeInsecureRequests: null,
  //       },
  //     },
  //   },
  // },
];
