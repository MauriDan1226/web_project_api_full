import React from "react";
import close from "../../../../../images/close.svg";

function RemoveCard({ onClose, onConfirmDelete, isLoading }) {
    function handleSubmit(e) {
        e.preventDefault();
        onConfirmDelete();
    }

    return (
        <>
            <div className="popup__container">
                <button onClick={onClose}>
                    <img className="popup-close" src={close} alt="icono de cerrar" />
                </button>
                <form className="popup__form" onSubmit={handleSubmit}>
                    <h2 className="popup__form-title">¿Estás seguro?</h2>
                    <button className="popup__button" type="submit">
                        {isLoading ? "Eliminando..." : "Sí"}
                    </button>
                </form>
            </div>
        </>
    );
}

export default RemoveCard;