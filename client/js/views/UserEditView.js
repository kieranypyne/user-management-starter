const Backbone = require('backbone');
const UserModel = require('../models/UserModel');
const _ = require('lodash');

const UserEditView = Backbone.View.extend({
  el: `<div class="edit"></div>`,

  template: _.template(`
    <form class="" action="#users/ <%= user.get('_id')%>?_method=PUT" method="POST">
      <input value="<%= user.get('name')%>" type="text" class="edit-form, edit-name" placeholder="Name"/>

      <input value="<= user.get('email')%>" type="text" class="edit-form, edit-email" placeholder="Email"/>

      <input value="<= user.get('image')%>" type="text" class="edit-form, edit-image" placeholder="Profile Picture"/>

      <input value="<= user.get('bio')%>" type="text" class="edit-form, edit-bio" placeholder="Tell Me About Yourself"/>
    </form>
    `),

    events: {
      'submit form': 'handleFormSubmit'
    },

    handleFormSubmit(e) {
      const form = $(e.target);

      this.model.save({
        name: form.find('input[name="name"]').val(),
        email: form.find('input[email="email"]').val(),
        image: form.find('input[image="image"]').val(),
        bio: form.find('input[bio="bio"]').val()
      }, {
        success: () => {
          form.find('input[type="text"]').val('');
        }
      });
      e.preventDefault();
    },

    initialize() {
      this.model.fetch();
      this.listenTo(this.model, 'sync', this.render);
    },

    render() {
      this.$el.html(this.template({ user: this.model }));
      return this;
    }
});

module.exports = UserEditView;
