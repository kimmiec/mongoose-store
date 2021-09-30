// ========== DEPENDENCIES ==========
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const Store = require('./models/products.js');
const methodOverride = require('method-override');

// ========== MIDDLEWARE ==========
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
// ========== DATABASE CONNECTION ==========
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
});

// ========== ERROR/SUCCESS ==========
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// ======== ROUTES ========
const itemsController = require('./controllers/items.js');
app.use('/store', itemsController);

// ========== LISTENER ==========
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);
});