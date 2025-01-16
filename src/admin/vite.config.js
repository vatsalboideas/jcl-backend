// import { mergeConfig } from 'vite';

// export default (config) => {
//   // Important: always return the modified config
//   return mergeConfig(config, {
//     resolve: {
//       alias: {
//         '@': '/src',
//       },
//     },
//     server: {
//       cors: {
//         origin: ['http://localhost:5174', 'your white list origin'],
//         credentials: false,
//       },
//     },
//   });
// };
const { mergeConfig } = require('vite');

module.exports = (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // server: {
    //   cors: {
    //     origin: ['http://localhost:3001'], // Match Strapi's origin
    //     credentials: true,
    //   },
    // },
  });
};
