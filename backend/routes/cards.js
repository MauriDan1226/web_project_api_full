const cardsRouter = require("express").Router();
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRouter.get("/cards", getCards);

cardsRouter.post("/cards", createCard);

cardsRouter.delete("/cards/:cardId", removeCard);

cardsRouter.put("/cards/:cardId/likes", likeCard);

cardsRouter.delete("/cards/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
