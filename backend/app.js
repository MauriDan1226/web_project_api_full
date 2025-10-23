const express = require("express");
const app = express();
const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");

// Importar rutas
const usersRouter = require("./routes/users.js");
const cardsRouter = require("./routes/cards.js");

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/aroundb");

// Middleware temporal para simular usuario logueado
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // id de prueba
  };
  next();
});

// Rutas
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando en el puerto 3000 ");
});

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
