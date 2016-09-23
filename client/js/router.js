const Backbone = require('backbone');
const UsersCollection = require('./collections/UsersCollection');
const UserModel = require('./models/UserModel');
const UserEditView = require('./views/UserEditView');
const UserItemView = require('./views/UserItemView');
const UserListView = require('./views/UserListView');
const UserProfileView = require('./views/UserProfileView');

let currentView;

const Router = Backbone.Router.extend({
  routes: {
    '/' : 'users',
    'users/:id' : 'user',
    'users/:id/edit' : 'userEdit',
    '*users' : 'users'
  },

  users() {
    const view = new UserListView({ collection: new UsersCollection() });
    setView(view);
  },

  user(id) {
    const user = new UserModel({_id: id});
    const view = new UserEditView({model: user});
    setView(view);
  }
});

function setView(view) {
  if (currentView) {
    currentView.remove();
  } else {
    currentView = view;
  }

  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.appendChild(view.render().el);
};

module.exports = Router;
