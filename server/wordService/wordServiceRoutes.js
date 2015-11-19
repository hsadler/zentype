var WordServiceController = require('./wordServiceController');

module.exports = function(route) {
  route.get('/ping', WordServiceController.pingWordService);
};
