//  URL base de la API

export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

//  Helper para manejar respuestas de la API
const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return Promise.reject(
      data?.message || `Error en la solicitud: ${res.status}`
    );
  }
  return data;
};

//  Registro de usuario (POST /signup)
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

//  Autorización de usuario (POST /signin)
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

//  Validación de token (GET /users/me)
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};
