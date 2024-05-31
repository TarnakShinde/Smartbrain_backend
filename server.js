const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'klaw',
    database: 'smartbrain',
  },
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

knex.select().table('users')
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res) => {
	res.send(database.users);
});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,knex,bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req,res,knex,bcrypt)})

app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,knex)})

app.put('/image',(req,res) => {image.handleImage(req,res,knex)})

app.listen(3000,() => {
	console.log("App is Running on 3000");
});