const path = require('path');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');
const nextSourceMaps = require('@zeit/next-source-maps')();

module.exports = () => {
  const config = nextSourceMaps({
    // eslint-disable-next-line no-shadow
    webpack: config => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ];

      return config;
    },
  });
  return withSass({ ...config });
};
