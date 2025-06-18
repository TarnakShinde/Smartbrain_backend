const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();
const { supabase } = require("./supabase.js");
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('./controllers/clarifai');
const e = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res) => {
	res.send(database.users);
});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,supabase,bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req,res,supabase,bcrypt)})

app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req,res,supabase)})

app.put('/image',(req,res) => {image.handleImage(req,res,supabase)})

app.post('/clarifai', (req, res) => {
  clarifai.handleClarifai(req, res);
});

app.listen(3000,() => {
	console.log("App is Running on 3000");
});
