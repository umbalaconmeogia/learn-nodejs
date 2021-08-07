require('rootpath')();
const express = require('express');
const app = express();
require('dotenv').config({ path: '../../.env' });
const errorHandler = require('_middleware/error-handler');

console.log(process.env);

const port = 3000;

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})