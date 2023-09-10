const saltRounds = 10;
const handleRegister = (req,res,db,bcrypt) => {
    const { name, password, email} = req.body;
    if(!email || !name || !password){
        res.status(400).json("Incorrect Form Submission");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password,salt);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into("login")
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(users => {
            res.json(users[0]); //To grab the last item from the array database.users[database.users.length - 1]
        })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

    .catch(err => res.status(400).json('Unable to register'))
    
}

export default handleRegister;