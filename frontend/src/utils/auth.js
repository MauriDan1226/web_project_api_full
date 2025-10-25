const baseUrl = import.meta.env.VITE_BASE_URL || 'https://api.ana.chickenkiller.com';

export const register = ({email, password}) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name: 'Jacques Cousteau', about: 'Explorador', avatar: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg' }),
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Error en el registro: ${res.status}`);
  });
};

export const authorize = ({email, password}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Error en el login: ${res.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    if (res.ok) return res.json();
    return Promise.reject(`Token inválido: ${res.status}`);
  });
};

