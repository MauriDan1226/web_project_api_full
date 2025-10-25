import React, { useState, useEffect } from "react";
import close from "../../../../../images/close.svg";

function EditProfile({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [nameError, setNameError] = useState("");
    const [aboutError, setAboutError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);


    useEffect(() => {
        if (isOpen) {
            setName("");
            setAbout("");
            setNameError("");
            setAboutError("");
            setIsFormValid(false);
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, about });
    }

    return (
        <>
            <button onClick={onClose}>
                <img className="popup-close" src={close} alt="icono de cerrar" />
            </button>
            <form className="popup__form" onSubmit={handleSubmit}>
                <h2 className="popup__form-title">Editar perfil</h2>
                <input
                    className="popup__input"
                    type="text"
                    placeholder="Nombre"
                    id="first"
                    name="first"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameError(e.target.validationMessage);
                        setIsFormValid(e.target.closest("form").checkValidity());
                    }}
                    required
                    minLength="2"
                    maxLength="40"
                />
                <span className="popup__input-error" id="first-error">{nameError}</span>
                <input
                    className="popup__input"
                    type="text"
                    placeholder="Acerca de mí"
                    id="second"
                    name="second"
                    value={about}
                    onChange={(e) => {
                        setAbout(e.target.value);
                        setAboutError(e.target.validationMessage);
                        setIsFormValid(e.target.closest("form").checkValidity());
                    }}
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span className="popup__input-error" id="second-error">{aboutError}</span>
                <button className={`popup__button ${!isFormValid ? "popup__button_disabled" : ""}`} type="submit" disabled={!isFormValid}>
                    {isLoading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </>
    );
}

export default EditProfile;