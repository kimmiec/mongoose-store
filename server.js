// ========== DEPENDENCIES ==========
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Store = require('./models/products.js');
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

// ========== ROUTES ==========
// Index 
app.get('/store', (req, res) =>{
    // let qty =  - parseInt(store.qty)
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

// Delete
app.delete('/store/:id', (req, res) =>{
    Store.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/store');
    });
});


// Update
app.put('/store/:id', (req, res) =>{
    Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedStore) =>{
        res.redirect(`/store/${req.params.id}`);
    });
});

// Create
app.post('/store', (req, res) =>{
    Store.create(req.body, (error, createdStore) =>{
        res.redirect('/store');
    });
});

// Edit
app.get('/store/:id/edit', (req, res) =>{
    Store.findById(req.params.id, (error, foundStore) =>{
        res.render('edit.ejs', {
            store: foundStore
        });
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