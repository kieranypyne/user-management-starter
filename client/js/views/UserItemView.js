const _ = require('lodash');
const Backbone = require('backbone');

const UserItemView = Backbone.View.extend({
  el: '<li></li>',

  template: _.template(`
    <div class="UserListBox"
      <a href="#users/<%= user.get('_id') %>">
        <img src="<%= user.get('image') %>" alt="Profile Pic"/>
      </a>
      <div>
        <span> <%= user.get('name') %> </span>
      </div>
      <div>
        <span> <%= user.get('email') %> </span>
      </div>
      <div>
        <span> <%= user.get('bio') %> </span>
      </div>
      <div>
        <label>Activated:</label>
        <input type="checkbox" <%= user.get('activated') ? 'checked' : '' %> />
      </div>
    </div>
  `),

  events: {
    'click input[type="checkbox"]' : 'handleCheckBox'
  },

  handleCheckBox(e) {
    this.model.save({ activated: e.target.checked});
  },

  initialize() {
    this.listenTo(this.model, 'sync', this.render);
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

module.exports = UserItemView;
