import React, { useState, useEffect } from "react";
import close from "../../../../../images/close.svg";

function EditAvatar({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const [avatar, setAvatar] = useState("");
    const [avatarError, setAvatarError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAvatar("");
            setAvatarError("");
            setIsFormValid(false);
        }
    }, [isOpen]);


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar
        });
    }

    return (
        <>
            <button onClick={onClose}>
                <img className="popup-close" src={close} alt="icono de cerrar" />
            </button>

            <form className="popup__form" onSubmit={handleSubmit} noValidate>
                <h2 className="popup__form-title">Cambiar avatar</h2>
                <input
                    className="popup__input"
                    type="url"
                    placeholder="Enlace del avatar"
                    id="avatar"
                    name="avatar"
                    value={avatar}
                    onChange={(e) => {
                        const input = e.target;
                        const form = input.closest("form");
                        setAvatar(input.value);
                        setAvatarError(input.validationMessage);
                        setIsFormValid(form.checkValidity());
                    }}
                    required
                />
                <span className="popup__input-error" id="avatar-error">{avatarError}</span>
                <button className={`popup__button ${!isFormValid ? "popup__button_disabled" : ""}`} type="submit" disabled={!isFormValid}>
                    {isLoading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </>
    );
}

export default EditAvatar;