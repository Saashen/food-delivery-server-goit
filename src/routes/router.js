const express = require('express');
const apiRoutes = express.Router();

const mainRoute = require('./main/main');
const getProducts = require('./products/products');
const getProduct = require('./products/product');
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
  // .get('/users/:userId', getUser)

  .post('/users', middleware, createUser)
  .post('/image', getSaveImageHandlers())
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
  });

module.exports = apiRoutes;
