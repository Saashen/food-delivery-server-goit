const express = require('express');
const apiRoutes = express.Router();

const mainRoute = require('./main/main');
const getProducts = require('./products/getProducts');
const getProduct = require('./products/getProduct');
const getSaveImageHandlers = require('./image/saveImage');
const createUser = require('./user/createUser');
const getUser = require('./user/getUser');

const middleware = (req, resp, next) => {
  if (req.body.userName) {
    next();
    return;
  }

  resp.status(400);
  resp.json({
    error: 'user has no "userName" field',
  });
};

apiRoutes
  .get('/', mainRoute)
  .get('/products', getProducts)
  .get('/products/:id', getProduct)
  .get('/users/:userId', getUser)

  .post('/users', middleware, createUser)
  .post('/image', getSaveImageHandlers())
  .get('*', (req, res, next) => {
    res.status(404).send('Route does not exist');
  });

module.exports = apiRoutes;
