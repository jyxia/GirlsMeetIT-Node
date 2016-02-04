
/**
 * Module dependencies.
 */

var home = require('../../app/controllers/home');
var pin = require('../../app/controllers/pinController');

/**
 * Expose
 */

module.exports = function (app) {

  app.get('/', home.index);

  /**
   * APIs
   */

  app.get('/api/', function(req, res) {
    res.json({message: 'VC event data API.'});
  });

  app.get('/api/pins/', pin.show);
};
