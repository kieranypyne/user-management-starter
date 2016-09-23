const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String
  },

  email: {
    type: String
  },

  bio: {
    type: String
  },

  image: {
    type: String
  },
  activated: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', userSchema);
