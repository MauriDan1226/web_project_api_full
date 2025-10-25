const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Correo inválido',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, 
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
});

module.exports = mongoose.model('User', userSchema);