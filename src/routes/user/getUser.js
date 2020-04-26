const path = require('path');

const filePath = path.join(__dirname, '../../', 'db', 'all-users.json');
const usersData = require(filePath);

const getUserFromDb = id => {
  const userWithId = usersData.find(user => user.id === id);
  return JSON.stringify(userWithId);
};

const getUser = (request, response) => {
  const id = Number(request.params.userId);

  const sendResponse = user => {
    response.status(200);
    response.set('Content-Type', 'application/json');
    response.json({
      user,
    });
  };

  const sendError = () => {
    response.set('Content-Type', 'application/json');
    response.status(400);
    response.json({
      status: 'not found',
    });
  };

  const user = getUserFromDb(id);
  return user ? sendResponse(user) : sendError();
};

module.exports = getUser;
