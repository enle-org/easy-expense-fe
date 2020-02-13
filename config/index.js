const commonEnvs = {
  SENTRY_DSN: process.env.SENTRY_DSN,
  ENVIRONMENT: process.env.ENVIRONMENT,
  OAUTH_GOOGLE_CLIENT_ID: process.env.OAUTH_GOOGLE_CLIENT_ID,
  UNSIGNED_UPLOAD_PRESET: process.env.UNSIGNED_UPLOAD_PRESET,
  SIGNED_UPLOAD_PRESET: process.env.SIGNED_UPLOAD_PRESET,
  CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

const config = Object.freeze({
  local: {
    ...commonEnvs,
    API_URL: process.env.LOCAL_API_URL,
    CLIENT_URL: process.env.LOCAL_CLIENT_URL,
  },
  development: {
    ...commonEnvs,
    API_URL: process.env.DEV_API_URL,
    CLIENT_URL: process.env.DEV_CLIENT_URL,
  },
  production: {
    ...commonEnvs,
    API_URL: process.env.PROD_API_URL,
    CLIENT_URL: process.env.PROD_CLIENT_URL,
  },
});

export default config[commonEnvs.ENVIRONMENT];
