const express = require('express');
const { db } = require("../db");

const route = express.Router();

route.get('/', async (req, res) => {
  const { lowQuantity } = req.query;
  let queries = lowQuantity ? { instock: { $lt: 100 } } : {};
  try {
    let inventories = await db.inventories.find(queries).toArray();
    res.json({ data: inventories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'something went wrong' });
  }
});

module.exports = route;