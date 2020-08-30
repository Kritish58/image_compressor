const mongoose = require('mongoose');
const express = require('express');
const chalk = require('chalk');
const path = require('path');

const { app } = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
//   console.log(chalk.bold.blue('mongodb connected'));
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
}

app.listen(PORT, () => {
  console.log(chalk.bold.yellow(`Server is running on port ${PORT}`));
});
