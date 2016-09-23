const UserModel = require('../models/UserModel');

module.exports = {
  list(req, res, next) {
    UserModel.find().exec()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        return next(err);
      });
  },

  show(req, res, next) {
    UserModel.findOne({ _id: req.params.id }).exec()
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  },

  edit(req, res, next) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function(err, user) {
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  },

  create(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const bio = req.body.bio;
    const image = req.body.image;

    new UserModel({ name, email, bio, image}).save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  },

  update(req, res, next) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.bio = req.body.bio;
      user.image = req.body.image;

      user.save(function(err, user) {
        res.json(user);
      });
    });
  },

  remove(req, res, next) {
    var id = req.params.id;
    UserModel.findByItemAndRemove({_id: id}, function (err, user) {
      users.remove(user);
    });
    users.save(function(err, users) {
      res.redirect('/users');
    });
  }
};
