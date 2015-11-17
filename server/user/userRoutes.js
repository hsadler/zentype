var UserController = require('./userController');

module.exports = function(route) {
  route.get('/sampleEndpoint', UserController.sampleEndpoint);
};
