const path = require('path');

const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');
const productsData = require(filePath);

function getProductFromDb(id) {
  const productWithId = productsData.find(product => product.id === id);
  return JSON.stringify(productWithId);
}

const getProduct = (request, response) => {
  const id = Number(request.params.id);

  const sendResponse = product => {
    response.status(200);
    response.set('Content-Type', 'application/json');
    response.json({
      status: 'success',
      product,
    });
  };

  const sendError = () => {
    response.set('Content-Type', 'application/json');
    response.status(400);
    response.json({
      status: 'no products',
      products: [],
    });
  };

  const product = getProductFromDb(id);

  if (product) {
    return sendResponse(product);
  } else {
    return sendError();
  }
};

module.exports = getProduct;