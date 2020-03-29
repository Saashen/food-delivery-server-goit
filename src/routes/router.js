const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const signupRoute = require('./signup/signup');

const router = {
  '/products': productsRoute,
  '/signup': signupRoute,
  default: mainRoute,
};

module.exports = router;