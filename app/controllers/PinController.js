var mongoose = require('mongoose');
var rp = require('request-promise');
var Pin = mongoose.model('Pin');

exports.show = function(req, res) {
  var accessToken = 'AS8k1Lx2x0QnfNn0eo_kKEg806xCFC-Lm5_biVRC1ZLjM8BHmwAAAAA';
  accessPinterestBoardPins('foudix/girls-tech', accessToken, res);
};

var accessPinterestBoardPins = function(board, accessToken, res) {
  var options = {
    uri: 'https://api.pinterest.com/v1/boards/'+ board +'/pins/',
    qs: {
      access_token: 'AS8k1Lx2x0QnfNn0eo_kKEg806xCFC-Lm5_biVRC1ZLjM8BHmwAAAAA',
      fields: 'id,created_at,note,image,counts,url,creator'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  rp(options).then(function(pins) {
    var newPins = [];
    for (var i = 0; i < pins.data.length; i++) {
      newPins.push(filterPinInfo(pins.data[i]));
    }
      var statusCode = res.statusCode;
      var response = {
          status: statusCode,
          data: newPins
      };
    res.send(response);
  }).catch(function (err) {
    console.log(err);
  });
};

var filterPinInfo = function(pin) {
  var newPin = {};
  newPin.author = pin.creator.first_name + ', ' + pin.creator.last_name;
  newPin.created_at = pin.created_at;
  newPin.pinLink = pin.url;
  newPin.imageLink = pin.image.original.url;
  newPin.description = pin.note;
  newPin.likeCounts = pin.counts.likes;
  return newPin;
};
