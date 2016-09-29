const _ = require('lodash');
const Backbone = require('backbone');

const UserProfileView = Backbone.View.extend({
  el: '<div class="profile"></div>',

  template: _.template(`
    <img src"<%= user.get('image') %>" alt="Profile Pic"/>
    <div>
      <label>Name:</label>
      <span> <%= user.get('name') %></span>
    </div>
    <div>
      <label>Email:</label>
      <span> <%= user.get('email') %></span>
    </div>
    <div>
      <label>Bio:</label>
      <span> <%= user.get('bio') %></span>
    </div>
    <div>
      <label>Activated:</label>
      <input type="checkbox" name="activated" class="checkbox">
    </div>
  `),

  initialize() {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click input[type="checkbox"]' : 'handleCheckBox'
  },

  handleCheckBox(e) {
    this.model.save({ activated: e.target.checked});
  },

  render() {
    this.$el.html(this.template({ user: this.model }));
    return this;

    if (this.model.get('activated')) {
      this.$el.addClass('activated');
    } else {
      this.$el.removeClass('activated');
    }

  }
});

module.exports = UserProfileView;
