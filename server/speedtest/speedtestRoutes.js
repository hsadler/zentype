var SpeedtestController = require('./speedtestController');

module.exports = function(route) {
  route.get('/randomlist', SpeedtestController.getRandomList);
};
