const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  setUserInfo,
  setUserAvatar,
} = require("../controllers/users");

usersRouter.get("/users", getUsers);

usersRouter.get("/users/:id", getUserById);

usersRouter.post("/users", createUser);

usersRouter.patch("/users/me", setUserInfo);

usersRouter.patch("/users/me/avatar", setUserAvatar);

module.exports = usersRouter;
