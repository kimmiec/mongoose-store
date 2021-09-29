// ========== DEPENDENCIES ==========
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Store = require('./models/products.js');

// ========== MIDDLEWARE ==========
app.use(express.urlencoded({extended: true}));

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

// ========== ROUTES ==========
// Index 
app.get('/store', (req, res) =>{
    Store.find({}, (error, allStores) =>{
        res.render('index.ejs', {
            store: allStores
        });
    });
});


// New
app.get('/store/new', (req, res) =>{
    res.render('new.ejs');
});


// Create
app.post('/store', (req, res) =>{
    Store.create(req.body, (error, createdStore) =>{
        res.redirect('/store');
    });
});


// Show
app.get('/store/:id', (req, res) =>{
    Store.findById(req.params.id, (err, foundStore) =>{
        res.render('show.ejs', {
            store: foundStore,
        });
    });
});




// ========== LISTENER ==========
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`);
});