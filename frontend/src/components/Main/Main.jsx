import { useContext } from "react";
import add from "../../../src/Images/Vector+.png";
import lapiz from "../../../src/Images/vectorLapiz.png";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Card from "./components/Card/Card.jsx";
import EditProfile from "./components/Popup/EditProfle/EditProfile.jsx";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup.jsx";
import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import Popup from "./components/Popup/Popup";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  onUpdateAvatar,
}) {
  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editAvatar = {
    title: "Editar Avatar",
    children: <EditAvatar onUpdateAvatar={onUpdateAvatar} />,
  };
  const editProfile = { title: "Editar Perfil", children: <EditProfile /> };
  const imagePopup = { title: "Imagen grande", children: <ImagePopup /> };

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  return (
    <main className="start">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="{currentUser.name}"
            className="profile__avatar-img"
          />
          <button
            className="profile__avatar-edit"
            onClick={() => {
              onOpenPopup(editAvatar);
            }}
          ></button>
        </div>
        <div className="profile__information">
          <h1 className="profile__user">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__edition"
          onClick={() => {
            onOpenPopup(editProfile);
          }}
        >
          <img
            src={lapiz}
            alt="Around the U.S logo"
            className="logo header__logo"
          />
        </button>
        <button
          aria-label="Add card"
          className="profile__post"
          type="button"
          onClick={() => {
            onOpenPopup(newCardPopup);
          }}
        >
          <img
            src={add}
            alt="Around the U.S logo"
            className="logo header__logo"
          />
        </button>
      </section>

      <section className="gallery">
        <div className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
        <p className="ejemplo"></p>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
