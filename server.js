const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt');

const PORT = process.env.PORT

import register from "./controllers/register";
import signin from "./controllers/signin";
import profile from "./controllers/profile";
import image from "./controllers/image";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    host : process.env.DATABASE_HOST,     
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    port: "5432",
    database : process.env.DATABASE_DB,
    ssl: { rejectUnauthorized : false },
}
});
db.select('*').from('users');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req , res) => {res.send('It is working')})

app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register' , (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})


app.listen(3000||PORT, () => {
    console.log(`Running on ${PORT}`);
})


