const mongoose = require('mongoose');
const chalk = require('chalk');
const { app } = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log(chalk.bold.blue('mongodb connected'));
});

app.listen(PORT, () => {
  console.log(chalk.bold.yellow(`Server is running on port ${PORT}`));
});
