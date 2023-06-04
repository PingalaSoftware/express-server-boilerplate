const { version, name } = require('../../../package.json');
const config = require('../../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: name,
    version,
  },
  servers: [
    {
      url: `http://localhost:${config.port}${config.apiPath}/v1`,
    },
  ],
};

module.exports = swaggerDef;
