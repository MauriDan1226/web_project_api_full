import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
import "../../blocks/login.css";

function Login({ onLogin, tooltip, setTooltip, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password); // En App.jsx: authorize // guardar token // checkToken
  };

  return (
    <>
      <main className="login">
        <form onSubmit={handleSubmit} className="login__container" noValidate>
          <h2 className="login__title">Iniciar Sesión</h2>

          <input
            className="login__input"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="login__button" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="login__redirect">
          ¿No eres usuario?{" "}
          <Link to="/signup" className="login__link">
            Regístrate aquí
          </Link>
        </p>
      </main>

      <InfoTooltip
        isOpen={tooltip.open}
        isSuccess={tooltip.success}
        message={tooltip.message}
        onClose={() => setTooltip({ ...tooltip, open: false })}
      />
    </>
  );
}

export default Login;
