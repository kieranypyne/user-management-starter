const Backbone = require('backbone');
const UserItemView = require('./UserItemView');
const UserModel = require('../models/UserModel')

const UserListView = Backbone.View.extend({
  el: `
  <div>
    <form action="/users" method="POST">
      <input type="text" name="name" placeholder="Name"/>

      <input type="text" name="email" placeholder="Email"/>

      <input type="text" name="image" placeholder="Profile Picture"/>

      <input type="text" name="bio" placeholder="Tell Me About Yourself"/>

      <input type="submit" value="Submit"/>
    </form>
  </div>

  <div>
    <ul class="user-list"></ul>
  </div>
  `,

  initialize() {
    this.collection.fetch();
    this.listenTo(this.collection, 'update', this.render);
  },

  events: {
    'submit form': 'handleFormSubmit'
  },

  handleFormSubmit(e) {
    const form = $(e.target);
    const user = new UserModel({
      name: form.find('input[name="name"]').val(),
      email: form.find('input[name="email"]').val(),
      image: form.find('input[name="image"]').val(),
      bio: form.find('input[name="bio"]').val(),
    });
    var that = this;
    user.save(null, {
      success: function() {
        that.collection.add(user);
        form.find('input[type="text"]').val('');
        that.render();
      }
    });
    e.preventDefault();
  },

  render() {
    this.$el.find('ul').html('');

    this.collection.each(user => {
      const view = new UserItemView({ model: user });
      this.$el.append(view.render().el);
    });

    return this;
  }
});

module.exports = UserListView;
