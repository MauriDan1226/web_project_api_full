import { useState } from "react";

function NewCard({ onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name: name, link: link });
    setName("");
    setLink("");
  };
  return (
    <form
      id="edit-profile-form"
      className="popup__form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="text"
        value={name}
        className="popup__input"
        id="add-title"
        name="title"
        placeholder="Titulo"
        minLength="2"
        maxLength="30"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <span className="form__input_type_error add-title-error"></span>

      <input
        type="url"
        className="popup__input"
        id="add-image"
        name="name"
        placeholder="Enlace a la imagen"
        minLength="2"
        maxLength="200"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <span className="form__input_type_error input-hobbie-error"></span>

      <button type="submit" className="popup__button">
        Guardar
      </button>
    </form>
  );
}

export default NewCard;
