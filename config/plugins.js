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
      // sizeLimit: 5 * 1024 * 1024, // 5 MB
      provider: 'local',
      providerOptions: {
        sizeLimit: 5 * 1024 * 1024, // 5 MB
        extensions: ['.pdf'],
        allowedTypes: ['application/pdf'],
      },
      actionOptions: {
        upload: {
          allowedTypes: [
            'application/pdf', // Allow PDFs
            // 'image/webp', // Allow WebP images
            // 'image/jpeg', // Allow JPG images
            // 'image/png', // Allow PNG images
          ],
        },
      },
    },
  },
});
