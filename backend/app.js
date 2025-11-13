require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const { errors: celebrateErrors } = require("celebrate");
const expressWinston = require("express-winston");
const winston = require("winston");

// Controladores de auth (públicos)
const { login, createUser } = require("./controllers/users");

// Routers privados
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// Middleware de auth (protege lo que sigue)
const auth = require("./middlewares/auth");

// Manejador centralizado de errores
const errorHandler = require("./middlewares/errorHandler");

// Validadores de celebrate
const { userValidation, loginValidation } = require("./middlewares/validator");

const {
  PORT = 3000,
  MONGODB_URI = "mongodb://localhost:27017/aroundb",
  NODE_ENV = "development",
} = process.env;

/* ───────── Seguridad básica ───────── */
app.disable("x-powered-by");
app.use(helmet());

/* ───────── CORS ───────── */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  // "https://tu-dominio.com",
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.options(/.*/, cors());

/* ───────── Rate limit ───────── */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

/* ───────── Parsers ───────── */
app.use(express.json());
app.use(cookieParser());

/* ───────── Logging de requests ───────── */
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({ filename: "request.log" }), // guarda solicitudes
      new winston.transports.Console(), // también muestra en consola
    ],
    format: winston.format.json(), // formato JSON
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}",
    expressFormat: false,
    colorize: false,
  })
);

/* ───────── Rutas públicas (sin auth) ───────── */
app.post("/signup", authLimiter, userValidation, createUser);
app.post("/signin", authLimiter, loginValidation, login);

/* ───────── Healthcheck / raíz ───────── */
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (req, res) =>
  res.send(`Servidor Express funcionando en el puerto ${PORT}`)
);

/* ───────── A partir de aquí TODO requiere auth ───────── */
app.use(auth);

/* ───────── Rutas privadas ───────── */
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

/* ───────── 404 (centralizado) ───────── */
app.use((req, res, next) => {
  const err = new Error("Recurso no encontrado");
  err.statusCode = 404;
  next(err);
});

/* ───────── Errores de celebrate ───────── */
app.use(celebrateErrors());

/* ───────── Logging de errores ───────── */
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.File({ filename: "error.log" }), // guarda errores
      new winston.transports.Console(), // y muestra en consola
    ],
    format: winston.format.json(),
  })
);

/* ───────── Manejador centralizado de errores (último) ───────── */
app.use(errorHandler);

/* ───────── Mongo ───────── */
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server up on port ${PORT} (${NODE_ENV})`);
    });
  })
  .catch((err) => {
    console.error(" Error conectando a MongoDB:", err);
    process.exit(1);
  });

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

module.exports = app;
