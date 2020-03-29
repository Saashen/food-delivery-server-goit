const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const saveUser = user => {
  const username = user.username;
  const filePath = path.join(__dirname, '../../', 'db', 'users');
  const post = JSON.stringify(user);

  fs.writeFile(`${filePath}/${username}.json`, post, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
};

const signupRoute = (request, response) => {
  if (request.method === 'POST') {
    let body = '';

    request.on('error', err => {
      console.error(err);
    });

    request.on('data', function(data) {
      body = body + data;
    });

    request.on('end', function() {
      const userObject = JSON.parse(body);

      saveUser(userObject);

      response.writeHead(201, { 'Content-Type': 'application/json' });
      const answer = JSON.stringify({
        status: 'success',
        user: userObject,
      });
      response.end(answer);
    });
  }
};

module.exports = signupRoute;
