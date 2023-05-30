const { version } = require('../../package.json');
const config = require('../../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'express-server-boilerplate API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/ajay-arya/express-server-boilerplate',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}${config.apiPath}/v1`,
    },
  ],
};

module.exports = swaggerDef;
