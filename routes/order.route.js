const express = require('express');
const { db } = require('../db');

const route = express.Router();

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  let order = await db.orders.find({ _id: parseInt(id) }).toArray();
  res.json({ data: order });
});

module.exports = route;
