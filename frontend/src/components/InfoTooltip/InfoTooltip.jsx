import React from 'react';
import close from "../../images/close.svg";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  
  return (
    <div className={`tooltip ${isOpen ? 'tooltip_opened' : ''}`}>
    <div className="tooltip__container">
      <img className="tooltip__close" src={close} onClick={onClose}></img>
      {isSuccess ? (
        <>
         <div className="tooltip__icon tooltip__icon_success" />
         <h2 className="tooltip__message">¡Correcto! Ya estas registrado.</h2>
            </>
        ) : (
          <>
            <div className="tooltip__icon tooltip__icon_fail" />
            <h2 className="tooltip__message">Uy, algo salió mal. Por favor, inténtalo de nuevo.</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;