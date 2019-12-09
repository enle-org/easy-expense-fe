const config = Object.freeze({
  development: {
    API_URL: process.env.DEV_API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
  production: {
    API_URL: process.env.PROD_API_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
});

export default config[process.env.ENVIRONMENT];
