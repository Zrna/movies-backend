const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Reviews API',
      version: '1.1.0',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
