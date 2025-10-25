import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth__submit-button" type="submit">
          Regístrate
        </button>
      </form>
      <p className="auth__text">
        ¿Ya eres miembro? <Link to="/signin" className="auth__link">¡Inicia sesión aquí!</Link>
      </p>
    </div>
  );
}

export default Register;