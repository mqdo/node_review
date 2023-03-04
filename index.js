const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb, db } = require('./db');
const inventoryRoute = require('./routes/inventory.route');
const orderRoute = require('./routes/order.route');
const authRoute = require('./routes/auth.route');
const auth = require('./auth');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/inventories', inventoryRoute);
app.use('/orders', auth, orderRoute);
app.use('/auth', authRoute);

connectToDb().then(() => {
  app.listen(3000, () => {
    console.log('App is running at 3000');
  });
});
