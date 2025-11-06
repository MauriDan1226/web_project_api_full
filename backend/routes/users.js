const express = require("express");
const usersRouter = express.Router();
const {
  getUsers,
  getUserById,
  getMe,
  setUserInfo,
  setUserAvatar,
  createUser,
  login,
} = require("../controllers/users");
const auth = require("../middlewares/auth"); // Middleware de autenticación

// --- Rutas públicas (no requieren autenticación) ---
usersRouter.post("/signup", createUser); // Registro
usersRouter.post("/signin", login); // Inicio de sesión

// --- Middleware global para proteger todo lo demás ---
usersRouter.use(auth); // A partir de aquí todas las rutas requieren token válido

// --- Rutas privadas (solo accesibles con token válido) ---
usersRouter.get("/", getUsers);
usersRouter.get("/me", getMe);
usersRouter.get("/:id", getUserById);
usersRouter.patch("/me", setUserInfo);
usersRouter.patch("/me/avatar", setUserAvatar);

module.exports = usersRouter;
