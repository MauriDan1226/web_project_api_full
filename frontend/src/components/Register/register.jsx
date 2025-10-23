import { useState } from "react";
import { Link } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import "../../blocks/register.css";

function Register({ onRegister, tooltip, setTooltip, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
    // En App.jsx: register // save token, validate
  };

  return (
    <>
      <main className="register">
        <form
          onSubmit={handleSubmit}
          className="register__container"
          noValidate
        >
          <h2 className="register__title">Regístrate</h2>

          <input
            className="register__input"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <input
            className="register__input"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button className="register__button" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="register__redirect">
          ¿Ya eres miembro?{" "}
          <Link to="/signin" className="register__link">
            Inicia sesión aquí
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

export default Register;
