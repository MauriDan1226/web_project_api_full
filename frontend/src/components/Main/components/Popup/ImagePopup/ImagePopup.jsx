const ImagePopup = () => {
  return (
    <div className="popup__info">
      <button className="popup__close">
        <img src="./images/CloseIcon.png" alt="tache" />
      </button>
      <img className="popup__photo" src="./images/1.jpg" alt="ejemplo" />
      <p class="popup__title">nombre de card</p>
    </div>
  );
};

export default ImagePopup;
