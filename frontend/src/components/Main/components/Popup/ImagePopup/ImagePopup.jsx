import React from "react";
import close from "../../../../../images/close.svg";

function ImagePopup({ isOpen, onClose, card }) {
    return (
        <div className={`bigimage ${isOpen ? "bigimage__opened" : ""}`}>
            <div className="bigimage__form">
                <button onClick={onClose}>
                    <img className="bigimage-close" src={close} alt="icono de cerrar" />
                </button>
                {card && (
                    <>
                        <img src={card.link} alt={card.name} className="bigimage-ils" />
                        <p className="bigimage-title">{card.name}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ImagePopup;