/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var PinCreatorSchema = new Schema({
  url: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  id: { type: String, default: '' }
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

PinCreatorSchema.method({
  getJSONFormattedPin: function() {
    var createdAt = new Date(this.createdAt);
    var formattedSession = {
      type: "pin",
      id: this._id,
      attributes: {
        "id": this.id,
        "firstName": this.firstName,
        "lastName": this.lastName
      }
    };
    if (this.createdAt) {
      var endedAt = new Date(this.endedAt);
      formattedSession.attributes.ended_at = endedAt;
    }
    return formattedSession;
  }
});

/**
 * Statics
 */

PinCreatorSchema.static({
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

mongoose.model('PinCreator', PinCreatorSchema);
