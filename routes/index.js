const router = require('express').Router();


module.exports = function(io) {

  // TEST ROUTE ----//
  router.get('/', function (req, res, next) {
    res.render('index', { message: 'Hello, world!' });
  });

  return router;
}


