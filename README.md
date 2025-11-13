web_project_api_full

Aplicación full stack desarrollada en el bootcamp de TripleTen. Aglutina un backend Node.js/Express conectado a MongoDB y un frontend en React 19 creado con Vite, permitiendo gestionar usuarios y tarjetas mediante autenticación JWT.

🏛️ Arquitectura

El proyecto sigue una arquitectura moderna dividida en:

Backend (API REST): Node.js, Express 5, rutas modulares, middlewares, controladores y modelos Mongoose.

Frontend (SPA): React 19, componentes funcionales, hooks modernos y React Router DOM 7.

Capa de seguridad: CORS, Helmet, Rate Limiting, validación con Celebrate/Joi y JWT.

Observabilidad: winston/express-winston, logs persistidos y health-check.

🚀 Stack tecnológico

Backend: Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, Celebrate/Joi, Helmet, CORS, express-rate-limit, cookie-parser, dotenv, express-winston, Winston.

Frontend: React 19, React Router DOM 7, Vite 7, Fetch API, Context API / estado local, ESLint 9.

DevOps: nodemon, npm scripts, logs persistidos (request.log, error.log), variables de entorno.

✨ Características destacadas

Autenticación y autorización
Registro y login (/signup, /signin), middleware JWT, rutas privadas (/users, /cards).

Seguridad por defecto
helmet, desactivación de x-powered-by, CORS restringido por whitelist, rate limiting (global y para auth).

Validación y manejo de errores
celebrate/Joi para validar payloads, manejador centralizado de errores, logging estructurado con Winston.

Modelo de datos
Esquemas User y Card en Mongoose, contraseñas hasheadas, validación de email, avatar y URLs.

Frontend SPA moderno
React + Router, hooks, consumo del API vía utilidades api.js y auth.js, manejo de tokens.

Observabilidad
Logger de peticiones y errores, health-check (/healthz), mensajes homogéneos en toda la API.

🖼️ Descripción del proyecto de perfil social

El proyecto corresponde a una plataforma social dinámica, donde los usuarios pueden publicar fotografías, interactuar con publicaciones, y personalizar su perfil dentro de una interfaz moderna, responsiva y atractiva.

🔹 1. Publicación de fotografías

Subida y despliegue de imágenes en el perfil y en el feed.

Maquetación mediante CSS Grid para una galería organizada y limpia.

Renderizado dinámico con JavaScript / React y consumo del API.

🔹 2. Interacción con publicaciones

Sistema de likes con actualizaciones inmediatas.

Manejo de estado, UI reactiva y sincronización con el servidor.

🔹 3. Edición del perfil

Modificación de nombre, hobbies y avatar.

Modal implementado con HTML <dialog>, controlado por JavaScript/React.

🔹 4. Formularios accesibles y funcionales

Formularios diseñados para edición y publicación de contenido.

Validación y experiencia coherente en frontend.

🔹 5. Diseño completamente responsivo

Interfaz optimizada para móviles, tabletas y escritorio.

Maquetación híbrida con Flexbox + Grid, adaptable al viewport.
