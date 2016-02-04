
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var PinSchema = new Schema({
  id: { type: String, default: '' },
  url: { type: String, default: '' },
  note: { type: String, default: '' },
  created_at: {type: Number},
  creator: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' }
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PinSchema.method({
  getJSONFormattedSession: function() {
    var createdAt = new Date(this.created_at);
    var formattedPin = {
      type: "pin",
      id: this.id,
      attributes: {
        "description": this.note,
        "pinLink": this.url,
        "imageLink": this.imageLink,
        "created_at": this.created_at
      }
    };
    return formattedPin;
  }
});

/**
 * Statics
 */

PinSchema.static({
  list: function(options, cb) {
    var criteria = options || {}
    this.find(criteria)
      .sort({'createdAt': -1})
      .limit(100)
      .exec(cb);
  },
  findSession: function(id, cb) {
    this.findOne({_id: id}).exec(cb);
  }
});

/**
 * Register
 */

mongoose.model('Pin', PinSchema);
