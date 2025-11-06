import basura from "../../../../images/Trash.svg";
import corazon from "../../../../images/VectorCorazon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = card;

  // Verifica si el usuario actual le ha dado "like" a la tarjeta
  const cardLikeButtonClassName = `card__button ${
    isLiked ? "card__black" : ""
  }`;
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <button
        src={basura}
        className="card__trash"
        aria-label="Delete card"
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img className="card__image" src={link} alt="fotografía de lago" />
      <div className="card__info">
        <p className="card__title">{name}</p>
        <button
          className="card__button"
          aria-label="Like card"
          type="button"
          onClick={handleLikeClick}
        >
          <img
            src={corazon}
            alt="boton corazon"
            className={cardLikeButtonClassName}
          />
        </button>
      </div>
    </div>
  );
}
