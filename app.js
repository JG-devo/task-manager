const express = require('express');
require('dotenv').config({ path: './config.env' });

const { connectDB } = require('./db/connect');
const taskRoutes = require('./routes/taskRoutes');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware.
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRoutes);
app.use('*', notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    console.log('Connected to DB...');
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
