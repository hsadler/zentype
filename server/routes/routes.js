
module.exports = function (app, express) {
  var userRouter = express.Router();

  app.use('/api/user', userRouter);

  // inject our routers into their respective route files
  require('../user/userRoutes.js')(userRouter);
};
