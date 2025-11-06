const jwt = require("jsonwebtoken");
const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({ message: "Authorization required" });
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET); // Verifica el token JWT
  } catch (err) {
    return res.status(403).send({ message: "Invalid token" });
  }

  req.user = payload; // Agrega la información del usuario al request
  next(); // Continúa con el siguiente middleware o controlador
};
