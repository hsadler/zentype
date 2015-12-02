var UserController = require('./userController');

module.exports = function(route) {
  route.get('/create-user', UserController.createTestUser);
  route.get('/get-user', UserController.getTestUser);
};
