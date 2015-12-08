
var UserController = require('./userController');


module.exports = function(route) {
  route.get('/', UserController.getUser);
  route.get('/login', UserController.loginUser);
  route.post('/create', UserController.createUser);
};
