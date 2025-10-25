import React, { useState, useEffect } from "react";
import close from "../../../../../images/close.svg";

function NewCard({ isOpen, onClose, onAddCard, isLoading }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [nameError, setNameError] = useState("");
    const [linkError, setLinkError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
            setNameError("");
            setLinkError("");
            setIsFormValid(false);
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({
            name: name,
            link: link,
            liked: false
        });
    }

    return (
        <>
            <button onClick={onClose}>
                <img className="popup-close" src={close} alt="icono de cerrar" />
            </button>
            <form className="popup__form" onSubmit={handleSubmit}>
                <h2 className="popup__form-title">Nuevo Lugar</h2>
                <input
                    className="popup__input"
                    type="text"
                    placeholder="Título"
                    id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameError(e.target.validationMessage);
                        setIsFormValid(e.target.closest("form").checkValidity());
                    }}
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="popup__input-error" id="name-error">{nameError}</span>
                <input
                    className="popup__input"
                    type="url"
                    placeholder="Enlace de la imagen"
                    id="link"
                    name="link"
                    value={link}
                    onChange={(e) => {
                        setLink(e.target.value);
                        setLinkError(e.target.validationMessage);
                        setIsFormValid(e.target.closest("form").checkValidity());
                    }}
                    required
                />
                <span className="popup__input-error" id="link-error">{linkError}</span>
                <button className={`popup__button ${!isFormValid ? "popup__button_disabled" : ""}`} type="submit" disabled={!isFormValid}>
                    {isLoading ? "Agregando..." : "Agregar"}
                </button>
            </form>
        </>
    );
}

export default NewCard;