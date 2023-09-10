const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt');

const PORT = process.env.PORT
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',     
    user : 'postgres',
    password : "klaw",
    port: "5432",
    database : 'smartbrain'
}
});
db.select('*').from('users');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req , res) => {res.send(database.users)})

app.post('/signin', signin.handleSignin(db,bcrypt))
app.post('/register' , (req, res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})


app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})

