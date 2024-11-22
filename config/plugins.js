module.exports = ({env}) => ({
    // email: {
    //     config: {
    //       provider: 'strapi-provider-email-brevo',
    //       providerOptions: {
    //         apiKey: process.env.BREVO_SMPT_API_KEY
    //       },
    //       settings: {
    //         defaultSenderEmail: 'vatsal.soni@boideas.com',
    //         defaultSenderName: 'Vatsal Soni',
    //         defaultReplyTo: 'vatsal.soni@boideas.com',
    //       },
    //     },
    //   }
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
    "email-designer-5": {
    enabled: true,
    // Your custom configuration here
    config: {
      // Here the Merge Tags defined will be merged with the defaults above
      mergeTags: {
        company: {
          name: "Company",
          mergeTags: {
            name: {
              name: "Company Name",
              value: "ACME Corp",
              sample: "ACME Corp",
            },
          },
        },
      },
    },
  },
});
