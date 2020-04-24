const express = require('express');
const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const getSaveImageHandlers = require('./image/saveImage');
const createUser = require('./user/createUser');
const getUser = require('./user/getUser');

const apiRoutes = express.Router();

// const middleware = (req, resp, next) => {
//   console.log(req);
//   if (req.body.userName) {
//     next();
//     return;
//   }

//   resp.status(400);
//   resp.json({
//     error: 'user has no "userName" field',
//   });
// };

apiRoutes
  .get('/', mainRoute)
  .get('/users/:userId', getUser)
  .get('/products', productsRoute)

  .post('/users', createUser)
  .post('/image', getSaveImageHandlers())
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
  });

module.exports = apiRoutes;
