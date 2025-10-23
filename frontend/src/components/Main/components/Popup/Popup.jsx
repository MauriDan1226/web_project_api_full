import closeIcon from "../../../../images/CloseIcon.png";

const Popup = ({ title = "", children, onClose }) => {
  return (
    <div className="popup" id="popup-edit">
      <div
        className={`popup__info ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        <button
          className="popup__close"
          aria-label="Close modal"
          onClick={onClose}
        >
          <img src={closeIcon} alt="tache" />
        </button>

        {title && <p className="popup__title">{title}</p>}
        {children}
      </div>
    </div>
  );
};

export default Popup;
