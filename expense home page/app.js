const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./models/user')
const Expense = require('./models/expenses')
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', userRoutes);
app.use('/expense',expenseRoutes);


// Start the server
const PORT =3000;
sequelize
  .sync() // This will create the tables if they don't exist.
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
