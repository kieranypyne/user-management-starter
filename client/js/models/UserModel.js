const Backbone = require('backbone');

const UserModel = Backbone.Model.extend({
  urlRoot: '/users',
  idAttribute: '_id'
});

module.exports = UserModel;
