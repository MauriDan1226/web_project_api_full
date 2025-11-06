import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { api } from "../utils/api.js";
import InfoTooltip from "../components/InfoTooltip/InfoTooltip.jsx";
import Login from "../components/Login/login.jsx";
import Register from "../components/Register/register.jsx";
import { register, authorize, checkToken } from "../utils//auth.js";
import ProtectedRoute from "../components/ProtectedRoute/protectedRoute.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [tooltip, setTooltip] = useState({
    open: true,
    success: false,
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Controla la visibilidad de los enlaces de login o registro dependiendo de la ruta
  const showRegisterLink = location.pathname === "/signin";
  const showLoginLink = location.pathname === "/signup";

  // Obtener token del localStorage
  const getToken = () => localStorage.getItem("jwt");

  // Configurar el token en el localStorage
  const setToken = (token) => localStorage.setItem("jwt", token);

  // Eliminar el token del localStorage
  const removeToken = () => localStorage.removeItem("jwt");

  useEffect(() => {
    if (!isLoggedIn) return;

    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.log("Error al obtener tarjetas:", err));

    api
      .getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log("Error al obtener usuario:", err));
  }, [isLoggedIn]);

  const handleRegister = async (email, password) => {
    try {
      await register(email, password);
      setTooltip({ open: true, success: true, message: "¡Registro exitoso!" });
      setTimeout(() => {
        setTooltip({ open: false, success: true, message: "" });
        navigate("/signin");
      }, 2000);
    } catch (err) {
      console.error("Error al registrarse:", err);
      const message = err.includes("400")
        ? "Campos inválidos o incompletos."
        : "Error del servidor.";
      setTooltip({ open: true, success: false, message });
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { token } = await authorize(email, password);
      setToken(token); // Guardar el token
      setIsLoggedIn(true);
      const userData = await checkToken(token);
      setCurrentUser({ ...currentUser, ...userData.data });
      setTooltip({ open: true, success: true, message: "¡Ingreso exitoso!" });
      setTimeout(() => {
        setTooltip({ open: false, success: false, message: "" });
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      const message = err.includes("400")
        ? "Faltan campos obligatorios."
        : "Email o contraseña incorrectos.";
      setTooltip({ open: true, success: false, message });
    }
  };

  const handleLogout = () => {
    removeToken(); // Eliminar el token
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
  };

  const handleOpenPopup = (type, imageLink = "") => {
    console.log(type);
    setPopup(type);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const handleUpdateUser = (data) => {
    (async () => {
      api
        .updateUserInfo(data)
        .then((newData) => setCurrentUser(newData))
        .catch((err) => console.log("Error al Actualizar  el Usuario:", err));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      api
        .updateAvatar(data)
        .then((newData) => setCurrentUser(newData))
        .catch((err) => console.log("Error al Actualizar  el Usuario:", err));
    })();
  };

  const handleCardLike = async (data) => {
    try {
      const isLiked = data.isLiked;
      const newData = await api.changeLikeCardStatus(data._id, !isLiked);

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === data._id ? newData : currentCard
        )
      );
    } catch (err) {
      console.log("Error al actualizar la tarjeta:", err);
    }
  };

  const handleCardDelete = (data) => {
    api
      .deleteCard(data._id)
      .then((result) => {
        console.log("Tarjeta eliminada correctamente:", result);
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== data._id)
        );
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      api
        .createCard(data)
        .then((newData) => setCards([newData, ...cards]))
        .catch((err) => console.log("Error al Actualizar  el Usuario:", err));
    })();
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={currentUser.email}
          onLogout={handleLogout}
          showRegisterLink={showRegisterLink}
          showLoginLink={showLoginLink}
        />
        <Routes>
          {/* Ruta protegida */}
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                  onUpdateAvatar={handleUpdateAvatar}
                />
              </ProtectedRoute>
            }
          />

          {/* Ruta para el login */}
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login
                  onLogin={handleLogin}
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                />
              )
            }
          />

          {/* Ruta para el registro */}
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                />
              )
            }
          />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
