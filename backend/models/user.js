const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return v.match(
          /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)(\/[a-zA-Z0-9-._~:/?%#\[\]@!$&'()*+,;=]*)?(#.*)?$/gi
        );
      },
      message: "Introducir URL válida",
    },
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Correo electrónico inválido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: 8,
    select: false, // no devuelve la contraseña por seguridad
  },
});

module.exports = mongoose.model("User", userSchema);
