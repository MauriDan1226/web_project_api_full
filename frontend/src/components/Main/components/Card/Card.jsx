import React from "react";

function Card({ card, onDelete, onLike, onClick, currentUserId }) {
  const isOwner = card.owner && card.owner._id === currentUserId;
  const isLiked = card.likes.includes(currentUserId);


  return (
    <li key={card._id} className="cards__item">
      
        <button
          className="cards__item-delete"
          onClick={onDelete}
          aria-label="Eliminar tarjeta"
        />

      <img
        className="cards__item-img"
        src={card.link}
        alt={card.name}
        onClick={onClick}
      />

      <div className="cards__item-info">
        <p className="cards__item-name">{card.name}</p>
        <button
          className={`cards__item-like ${isLiked ? "cards__item-like_active" : ""}`}
          onClick={() => {
            onLike();
          }}
          aria-label="Me gusta"
        />
      </div>
    </li>
  );
}

export default Card;



