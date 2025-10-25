import React, { useEffect } from "react";

function Popup({ isOpen, onClose, children }) {
  
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);


  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div
      className={`popup ${isOpen ? "popup__opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container">{children}</div>
    </div>
  );
}

export default Popup;