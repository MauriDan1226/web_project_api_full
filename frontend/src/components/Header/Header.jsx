import { Link, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import logo from "../../images/logo.png";
import close from "../../images/close.svg";


function Header({ loggedIn, onLogout, userEmail }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {isMenuOpen && loggedIn && (
        <div className="header__nav_mobile header__nav_open">
          <span className="header__email">{userEmail}</span>
          <button onClick={onLogout} className="header__logout">Cerrar sesión</button>
        </div>
      )}

      <header className="header">
        <img src={logo} alt="Logo" className="header__image" />

        {loggedIn && (
          <button className="header__burger" onClick={toggleMenu}>
            {isMenuOpen ? (
              <img className="header__burger-close" src={close}></img>
            ) : (
              <>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </>
            )}
          </button>
        )}

        {!loggedIn && (
          <div className="header__nav_mobile-logout">
            {location.pathname === '/signin' ? (
              <Link to="/signup" className="header__link">Regístrate</Link>
            ) : location.pathname === '/signup' ? (
              <Link to="/signin" className="header__link">Iniciar sesión</Link>
            ) : null}
          </div>
        )}

        <div className="header__nav_desktop">
          {loggedIn ? (
            <>
              <span className="header__email">{userEmail}</span>
              <button onClick={onLogout} className="header__logout">Cerrar sesión</button>
            </>
          ) : location.pathname === '/signin' ? (
            <Link to="/signup" className="header__link">Regístrate</Link>
          ) : location.pathname === '/signup' ? (
            <Link to="/signin" className="header__link">Iniciar sesión</Link>
          ) : null}
        </div>
      </header>

      <div className="header__image-line"></div>
    </>
  );
}

export default Header;
