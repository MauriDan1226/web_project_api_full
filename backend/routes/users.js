const express = require("express");
const { celebrate, Joi, Segments } = require("celebrate");
const { validateURL } = require("../middlewares/validator"); // tu custom URL validator

const {
  getUsers,
  getUserById,
  getMe,
  setUserInfo,
  setUserAvatar,
} = require("../controllers/users");

const usersRouter = express.Router();

/*
  IMPORTANTE:
  - /signup y /signin QUEDAN en app.js (públicas).
  - Este router se monta como /users DESPUÉS de app.use(auth) en app.js,
    así que TODAS estas rutas ya están protegidas.
*/

/* ───────── Validadores locales ───────── */
const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required(), // ObjectId de Mongo
  }),
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

/* ───────── Rutas privadas ───────── */
usersRouter.get("/", getUsers);
usersRouter.get("/me", getMe);
usersRouter.get("/:id", idValidation, getUserById);
usersRouter.patch("/me", updateUserValidation, setUserInfo);
usersRouter.patch("/me/avatar", updateAvatarValidation, setUserAvatar);

module.exports = usersRouter;
