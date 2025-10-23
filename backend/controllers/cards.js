const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .populate("likes")
    .then((cards) => res.send(cards))
    .catch((err) =>
      res.status(500).send({ message: "Error al leer datos de tarjetas" })
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.removeCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
    .orFail()
    .then(() => res.send({ message: "Tarjeta eliminada" }))
    .catch((err) =>
      res.status(404).send({ message: "ID de tarjeta no encontrado" })
    );
};

module.exports.likeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (!card.likes.includes(req.user._id)) {
        card.likes = [...card.likes, req.user._id];
        card.save();
        res.status(200).send(card);
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.likes.includes(req.user._id)) {
        card.likes = card.likes.filter(
          (id) => id.toString() !== req.user._id.toString()
        );
        card.save();
        res.status(200).send(card);
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};
