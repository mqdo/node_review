const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const authorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const [head, token] = authorization.split(' ');
    let decoded = jwt.verify(token, SECRET_KEY);
    if (head === 'Bearer' && decoded) {
      next();
    }
  } catch (e) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authorization;