const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const bodyparser = require("body-parser");

// connecting to a mongoose server
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactdance');
}

//Define Mongoose Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

//creating a collections in mongodb
const Contact = mongoose.model('contacttform', ContactSchema);

//Express related stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//pug related stuff 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Endpoints
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
});

//for saving data in mongodb
app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send("This data has been recorded to the database");
    }).catch(()=>{
        res.status(400).send("Data was not saved to database");
    });
    // res.status(200).render('contact.pug');
});

//Start the server
app.listen(port, () => {
    console.log("This application is running succesfully on port 80");
});