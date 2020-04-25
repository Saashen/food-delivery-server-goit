const path = require('path');
var fs = require('fs');

const getProductFromDb = id => {
  const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');

  return fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    const readedFile = JSON.parse(data);
    const productWithId = readedFile.find(product => product.id === id);

    return JSON.stringify(productWithId);
  });
};

const getProduct = (request, response) => {
  const id = request.params.id;

  const sendResponse = product => {
    response.status(200);
    response.set('Content-Type', 'application/json');
    response.json({
      product,
    });
  };

  const sendError = () => {
    response.set('Content-Type', 'application/json');
    response.status(400);
    response.json({
      error: 'user was not saved',
    });
  };

  getProductFromDb(id)
    .then(data => sendResponse(data))
    .catch(sendError);
};

module.exports = getProduct;
