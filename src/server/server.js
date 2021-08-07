const express = require('express');
const app = express();
const errorHandler = require('_middleware/error-handler');

const port = 3000;

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})