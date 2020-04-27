const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const ordersFilePath = path.join(__dirname, '../../', 'db/orders');
const productsFilePath = path.join(
  __dirname,
  '../../',
  'db',
  'all-products.json',
);
const productsData = require(productsFilePath);

function getRandomInteger() {
  return Math.floor(Math.random() * (10000000000000000 - 1)) + 1;
}

const saveNewOrder = order =>
  writeFile(`${ordersFilePath}/${order.id}.json`, JSON.stringify(order));

const productsCheck = orderedProducts => {
  const products = [];

  orderedProducts.forEach(id =>
    productsData.find(product => {
      return product.id === id && products.push(product);
    }),
  );

  return products.length > 0;
};

const makeOrder = (request, response) => {
  const order = request.body;
  const orderData = { ...order, id: getRandomInteger() };

  const sendResponse = () => {
    response.json({
      status: 'success',
      order: orderData,
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      status: 'failed',
      order: null,
    });
  };

  const isAvailiable = productsCheck(orderData.products);
  isAvailiable
    ? saveNewOrder(orderData).then(sendResponse).catch(sendError)
    : sendError();
};

module.exports = makeOrder;
