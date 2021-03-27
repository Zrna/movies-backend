const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
