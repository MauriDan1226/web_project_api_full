import React from "react";
import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
const EditAvatar = () => {
  const avatarRef = useRef(null);
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({ avatar: avatarRef.current.value }); //  Enviar nuevo avatar
    onClose(); //  Cerrar popup después de actualizar
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      onSubmit={handleSubmit}
      id="edit-avatar-form"
      noValidate
    >
      <input
        type="url"
        name="avatar"
        id="owner-avatar"
        className="popup__input"
        placeholder="Image link"
        required
        ref={avatarRef}
      />
      <span className="popuperror" id="owner-avatar-error"></span>

      <button type="submit" className="popup__button">
        Guardar
      </button>
    </form>
  );
};

export default EditAvatar;
