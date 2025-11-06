const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { NODE_ENV, JWT_SECRET } = process.env;

/* GET /users */
module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

/* GET /users/:id */
module.exports.getUserById = async (req, res, next) => {
  try {
    const id = req.params.id || req.params.userId; // por si tu ruta usa :userId
    const user = await User.findById(id).orFail();
    res.status(200).send(user);
  } catch (err) {
    next(err); // CastError/DocumentNotFoundError los mapea tu errorHandler
  }
};

/* GET /users/me */
module.exports.getMe = async (req, res, next) => {
  try {
    const me = await User.findById(req.user._id).orFail();
    res.status(200).send(me);
  } catch (err) {
    next(err);
  }
};

/* POST /signup */
module.exports.createUser = async (req, res, next) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email y password son obligatorios" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name, // si no vienen, el modelo aplica defaults
      about,
      avatar,
      email,
      password: hash,
    });

    const data = user.toObject();
    delete data.password;
    res.status(201).send(data);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ message: "El correo ya está registrado" });
    }
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .send({ message: "Datos inválidos al crear el usuario" });
    }
    next(err);
  }
};

/* POST /signin */
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Correo y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).send({ message: "Credenciales incorrectas" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).send({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
      { expiresIn: "7d" }
    );

    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};

/* PATCH /users/me */
module.exports.setUserInfo = async (req, res, next) => {
  try {
    // Verificar que el usuario está editando su propio perfil
    if (req.user._id !== req.params.userId) {
      return res.status(403).send({ message: "No puedes editar este perfil" });
    }

    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, // Solo permite modificar el perfil del usuario autenticado
      { name, about },
      { new: true, runValidators: true } // sin upsert
    ).orFail();

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

/* PATCH /users/me/avatar */
module.exports.setUserAvatar = async (req, res, next) => {
  try {
    // Verificar que el usuario está editando su propio avatar
    if (req.user._id !== req.params.userId) {
      return res.status(403).send({ message: "No puedes editar este avatar" });
    }

    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, // Solo permite modificar el avatar del usuario autenticado
      { avatar },
      { new: true, runValidators: true } // sin upsert
    ).orFail();

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
