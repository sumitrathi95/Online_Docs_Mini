var checkAuth = require('../middleware/checkAuth')
var redirectAuth = require('../middleware/redirectAuth')

module.exports = function(app) {
  app.post('/logout', require('./logout').post);

  app.get('/secret', checkAuth, require('./secret').get);
  app.get('/apollo', checkAuth, require('./apollo').get);
  app.get('/covid', checkAuth, require('./covid').get);

  app.get('/login', redirectAuth, require('./login').get);
  app.post('/login', require('./login').post);

  app.get('/register', redirectAuth, require('./register').get);
  app.post('/register', require('./register').post);

  app.get('/', redirectAuth, function(req, res) {
    res.render('login');
  });

  };
