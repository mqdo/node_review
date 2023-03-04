const express = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('../db');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const route = express.Router();

route.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(403)
      .json({ message: 'Please enter a username and password' });
  }
  let queries = { username: username, password: password };
  try {
    let user = await db.users.find(queries).toArray();
    if (user) {
      const token = jwt.sign(username, SECRET_KEY);
      return res.json({ verify: true, token: token });
    } else {
      return res
        .status(403)
        .send({ message: 'username or password incorrect' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'something went wrong' });
  }
});

module.exports = route;
