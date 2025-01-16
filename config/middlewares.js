module.exports = [
  'strapi::logger',
  'strapi::errors',
  // 'strapi::poweredBy',
  // 'strapi::cors',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'http://10.128.26.55:3000',
        'http://10.128.26.55:3005',
        'http://localhost:3000',
      ],
      credentials: false,
    },
  },
  {
    name: 'strapi::poweredBy',
    config: {
      poweredBy: 'Jio Creative Labs',
    },
  },
  // {
  //   name: 'strapi::cors',
  //   config: {
  //     'Access-Control-Allow-Origin': 'http://localhost:3002',
  //     origin: 'http://localhost:3002', // Set to your frontend origin
  //     credentials: false, // Allow credentials (cookies, tokens, etc.)
  //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  //     headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  //     maxAge: 31536000,
  //     keepHeadersOnError: false,
  //   },
  // },
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
  'strapi::security',
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
