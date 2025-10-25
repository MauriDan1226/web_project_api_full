const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
    
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }

  req.user = payload; 
  next();
};
