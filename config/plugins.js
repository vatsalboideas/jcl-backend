module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.example.com'),
        port: env('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('SMTP_FROM_EMAILID'),
        defaultReplyTo: env('SMTP_FROM_EMAILID'),
      },
    },
  },
  upload: {
    config: {
      provider: 'local', // You can use 'local' or another provider if needed
      providerOptions: {},
      actionOptions: {
        upload: {
          allowedTypes: [
            'application/pdf', // Allow PDFs
            'image/webp', // Allow WebP images
            'image/jpeg', // Allow JPG images
            'image/png', // Allow PNG images
          ],
          maxSize: 5 * 1024 * 1024, // 5 MB limit
        },
      },
    },
  },
  // 'email-designer-5': {
  //   enabled: false,
  //   // Your custom configuration here
  //   config: {
  //     // Here the Merge Tags defined will be merged with the defaults above
  //     mergeTags: {
  //       company: {
  //         name: 'Company',
  //         mergeTags: {
  //           name: {
  //             name: 'Company Name',
  //             value: 'ACME Corp',
  //             sample: 'ACME Corp',
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
});
