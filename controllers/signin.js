const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json("Incorrect Form Submission");
    }
   db.select('email','hash').from('login')
   .where('email', '=', email)
   .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if(isValid){
        return db.select('*').from('users')
        .where('email','=',email)
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(400).json('Unable to get the user'))
    }else{
        res.status(400).json('Wrong Credentials')    
    }
    
   })
   .catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {  
    handleSignin : handleSignin
};

