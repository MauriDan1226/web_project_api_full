import React from "react";
import successImage from "../../images/pNegro.png";
import failImage from "../../images/xRojo.png";
import "../../blocks/popup.css";
import Popup from "../Main/components/Popup/Popup";

//Muestra éxito o error tras registro/login//

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  console.log(isOpen, onClose);
  return (
    <>
      {isOpen && (
        <Popup onClose={onClose}>
          <div className="popup__tooltip">
            <img
              src={isSuccess ? successImage : failImage}
              alt={isSuccess ? "Éxito" : "Error"}
              className="popup__tooltip-icon"
            />
            <p className="popup__tooltip-text">
              {message ||
                (isSuccess ? "Operación exitosa" : "Ocurrió un error")}
            </p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default InfoTooltip;
