const handleRegister = (req,res,knex,bcrypt) => {
	const {email, name, password } = req.body;
	if(!email || !name || !password){
		return res.status(400).json('Incorrect form Submission')
	}

	const hash = bcrypt.hashSync(password, 8);
	knex.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			console.log(loginEmail)
			return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0].email,
					name: name,
					joined: new Date()
				})
				.then(user => {
					res.json(user[0]);   //database.users[database.users.length-1]
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status('404').json('Unable to Register'));
}


module.exports = {
	handleRegister: handleRegister
};