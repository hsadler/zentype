var UserController = require('./userController');

module.exports = function(route) {
  route.post('/create-user', UserController.createTestUser);
  route.get('/get-user', UserController.getTestUser);
};
