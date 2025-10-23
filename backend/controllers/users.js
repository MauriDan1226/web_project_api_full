const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) =>
      res.status(500).send({ message: "Error al leer datos de usuarios" })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) =>
      res.status(404).send({ message: "ID de usuario no encontrado" })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.setUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.setUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};
