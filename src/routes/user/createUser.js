const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = user => {
  const filePath = path.join(__dirname, '../../', 'db', 'all-users.json');
  const checkFilePath = fs.existsSync(filePath);

  if (checkFilePath) {
    let readedData = require(filePath);
    readedData.push(user);

    return writeFile(filePath, JSON.stringify(readedData))
  }

  let arr = [];
  arr.push(user);

  return writeFile(filePath, JSON.stringify(arr));
};

const createUser = (request, response) => {
  const user = request.body;
  const userData = { ...user, id: Math.random() };

  const sendResponse = () => {
    response.json({
      status: 'success',
      user: userData,
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: 'user was not saved',
    });
  };

  saveNewUser(userData).then(sendResponse).catch(sendError);
};

module.exports = createUser;
