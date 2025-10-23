const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return v.match(
          /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)(\/[a-zA-Z0-9-._~:/?%#\[\]@!$&'()*+,;=]*)?(#.*)?$/gi
        );
      },
      message: "Introducir URL valido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema);
