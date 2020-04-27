const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');
const productsData = require(filePath);

const getProducts = (request, response) => {
  if (!request.query.ids) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
    return;
  }

  const products = [];

  const arrOfIds = request.query.ids.split(',').map(id => Number(id));
  arrOfIds.forEach(id =>
    productsData.find(product => {
      return product.id === id && products.push(product);
    }),
  );

  const sendResponse = products => {
    response.status(200);
    response.set('Content-Type', 'application/json');
    response.json({
      status: 'success',
      products,
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

  return products.length > 0 ? sendResponse(products) : sendError();
};

module.exports = getProducts;
