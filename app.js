const express = require('express');
const chalk = require('chalk');
const path = require('path');
const app = express();

// routes
const usersRoute = require('./components/User/userAPI');

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

// api
app.use('/api/users', usersRoute);

module.exports = {
  app,
};
