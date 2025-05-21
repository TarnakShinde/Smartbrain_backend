const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'smartbrain',
    password: 'root',
    database: 'smartbrain'
  },
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

knex.select('*').table('users')
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

app.post('/clarifai', async (req, res) => {
    const { imageUrl } = req.body;

    const PAT = "8ee14f50b4304003bc385101f0e9eb46";
    const USER_ID = "clarifai";
    const APP_ID = "main";

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: imageUrl,
                    },
                },
            },
        ],
    });

    try {
        const response = await fetch(
            "https://api.clarifai.com/v2/models/face-detection/outputs",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Key ${PAT}`,
                },
                body: raw,
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Clarifai API Error:", error);
        res.status(500).json({ error: "Unable to fetch from Clarifai API" });
    }
});

app.listen(3000,() => {
	console.log("App is Running on 3000");
});