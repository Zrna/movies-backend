const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = require('./config/swaggerOptions');
const db = require('./models');
const authRoutes = require('./routes/Auth');
const userRoutes = require('./routes/User');
const movieRoutes = require('./routes/Movie');

const PORT = 5000;
const app = express();

db.sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(error => console.log('Database connection error:', error));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);
app.use(userRoutes);
app.use(movieRoutes);

app.use('*', (_, res) => {
  return res.status(404).send({
    error: 'Route Not Found',
  });
});

app.listen(PORT, error => {
  if (error) return console.log(`Cannot listen on PORT: ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
