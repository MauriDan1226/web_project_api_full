import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Card from "../Main/components/Card/Card.jsx";
import Popup from "./components/Popup/Popup.jsx";
import avatarPlaceholder from "../../images/avatar.png";
import editAvatarIcon from "../../images/edit-avatar.png";
import editIcon from "../../images/editar.png";
import addIcon from "../../images/agregar.png";
import EditProfile from "./components/Popup/EditProfile/EditProfile.jsx";
import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup.jsx";
import RemoveCard from "./components/Popup/RemoveCard/RemoveCard.jsx";

import api from "../../utils/api.js";


function Main({ cards, setCards, setCurrentUser }) {

  const { currentUser } = useContext(CurrentUserContext);
 
  if (!currentUser) return <p>Cargando perfil...</p>;

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const openEditProfile = () => setIsEditProfileOpen(true);
  const openNewCard = () => setIsNewCardOpen(true);
  const openEditAvatar = () => setIsEditAvatarOpen(true);
  const openImagePopup = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const openConfirmDeletePopup = (card) => {
    setCardToDelete(card);
    setIsConfirmDeleteOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfileOpen(false);
    setIsNewCardOpen(false);
    setIsEditAvatarOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api.updateUserInfo(userInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.log('Error al actualizar perfil:', err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api.updateAvatar(data.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.log('Error al actualizar avatar:', err))
      .finally(() => setIsLoading(false));
  };

  const handleAddCard = (newCardData) => {
    setIsLoading(true);
    api.addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log('Error al agregar card:', err))
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;
    setIsLoading(true);
    api.deleteCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.log('Error al eliminar card:', err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.includes(currentUser._id);
    const request = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);
  
    request
      .then((updatedCard) => {
        setCards((state) => {
          const newState = state.map((c) => c._id === card._id ? updatedCard : c);
          return newState;
        });
      })
      .catch((err) => console.log('Error al cambiar like:', err));
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar || "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"}
            alt="foto de perfil"
            className="profile__avatar"
            id="avatar"
            loading="lazy"
          />
          <button className="profile__avatar-edit-icon" onClick={openEditAvatar}>
            <img src={editAvatarIcon} alt="Icono editar" />
          </button>
        </div>

        <div className="profile__info">
          <div>
            <p className="profile__info-name" id="name">{currentUser.name || "Jacques Cousteau"}</p>
            <img
              className="profile__edit-button"
              src={editIcon}
              alt="Icono editar perfil"
              id="edit-button"
              onClick={openEditProfile}
            />
          </div>
          <p className="profile__info-ocupation" id="about">{currentUser.about || "Descripción del usuario"}</p>
          <img
            src={addIcon}
            alt="icono adicionar informacion"
            className="profile__add-button"
            onClick={openNewCard}
          />
        </div>
      </section>

      <section className="cards">
        <ul className="cards__container">
            {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onClick={() => openImagePopup(card)}
              onDelete={() => openConfirmDeletePopup(card)}
              onLike={() => handleCardLike(card)} 
              currentUserId={currentUser?._id}
            />
          ))}
        </ul>
      </section>


      {isEditProfileOpen && (
        <Popup isOpen={isEditProfileOpen} onClose={closeAllPopups}>
          <EditProfile
            user={currentUser}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </Popup>
      )}

      {isNewCardOpen && (
        <Popup isOpen={isNewCardOpen} onClose={closeAllPopups}>
          <NewCard
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
            isLoading={isLoading}
          />
        </Popup>
      )}

      {isEditAvatarOpen && (
        <Popup isOpen={isEditAvatarOpen} onClose={closeAllPopups}>
          <EditAvatar
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
        </Popup>
      )}

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />

      {isConfirmDeleteOpen && (
        <Popup isOpen={isConfirmDeleteOpen} onClose={closeAllPopups}>
          <RemoveCard
            onClose={closeAllPopups}
            onConfirmDelete={handleCardDelete}
            isLoading={isLoading}
          />
        </Popup>
      )}
    </main>
  );
}

export default Main;