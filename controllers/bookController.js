const db = require('../models');

module.exports = {
    create: function(req, res) {
        db.Book.create(req.body)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err))
    },
    findAll: function(req, res) {
        db.Book.find()
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    },
    findOne: function(req, res) {
        db.Book.findById(req.params.id)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Book.findById(req.params.id)
            .then(dbBook => dbBook.remove())
            .then(dbBook => res.json(dbBook))
            .catch(err => res.status(422).json(err))
    }
}