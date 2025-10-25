
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';
import * as auth from '../utils/auth';
import { register } from '../utils/auth';

import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import { authorize, register, checkToken } from '../utils/auth.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Al cargar, verifica si hay token:
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          setUserEmail(user.email);
          navigate('/');
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false)); 
    } else {
      setIsLoading(false); 
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log('Error al cargar las cards:', err));
    }
  }, [loggedIn]);

  // Login handler

  const handleLogin = (email, password) => {
    auth.authorize({ email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          return auth.checkToken(data.token);
        }
        return Promise.reject('No se recibió token');
      })
      .then((user) => {
        setCurrentUser(user.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error en login:', err);
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  // Register handler

  const handleRegister = (email, password) => {
    auth.register({ email, password })
    .then(res => {
      if (res) {
        setIsSuccess(true);
        setCards([]);
        navigate('/signin');
      } else {
        setIsSuccess(false);
      }
      setIsTooltipOpen(true);
    })
    .catch((err) => {
      console.error('❌ Error en registro:', err); 
      setIsSuccess(false);
      setIsTooltipOpen(true);
    });
  };
    

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/signin');
  };

  if (isLoading) {
    return <div>Loading...</div>; // o tu spinner
  }


  return (
    
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Header loggedIn={loggedIn} userEmail={currentUser?.email} onLogout={handleLogout} />
      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute
              loggedIn={!!currentUser}
              element={
                <>
                  <Main cards={cards} setCards={setCards} setCurrentUser={setCurrentUser} />
                  <Footer />
                </>
              }
            />
          }
        />
      </Routes>

      <InfoTooltip
        isOpen={isTooltipOpen}
        isSuccess={isSuccess}
        onClose={() => setIsTooltipOpen(false)}
      />
    </CurrentUserContext.Provider>
  );
}


export default App;


