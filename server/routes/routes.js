
module.exports = function (app, express) {
  var userRouter = express.Router();
  var speedtestRouter = express.Router();

  app.use('/api/user', userRouter);
  app.use('/api/speedtest', speedtestRouter);

  // inject our routers into their respective route files
  require('../user/userRoutes.js')(userRouter);
  require('../speedtest/speedtestRoutes.js')(speedtestRouter);
};
