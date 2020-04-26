const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../', 'db', 'all-products.json');

const getProducts = (request, response) => {
  if (!request.query.ids) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
    return;
  }

  const arrOfIds = request.query.ids.split(',');

  console.log();
};

module.exports = getProducts;
