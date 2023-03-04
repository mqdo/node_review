const { MongoClient } = require('mongodb');
require('dotenv').config();

const db = {};

const { MONGODB_URL } = process.env;

const connectToDb = async () => {
  const client = new MongoClient(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const database = client.db('web63');
    db.inventories = database.collection('inventory');
    db.orders = database.collection('orders');
    db.users = database.collection('users');
    console.log('connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
};

module.exports = { connectToDb, db };
