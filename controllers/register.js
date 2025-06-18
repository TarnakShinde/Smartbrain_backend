
const handleRegister = async (req, res, supabase, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const hash = bcrypt.hashSync(password, 8);

  try {
    // Insert into login table
    const { data: loginData, error: loginError } = await supabase
      .from('login')
      .insert([{ email, hash }])
      .select('email')
      .single();

    if (loginError) throw loginError;

    // Insert into users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        email: loginData.email,
        name: name,
        joined: new Date().toISOString()
      }])
      .select('*')
      .single();

    if (userError) throw userError;

    res.json(userData);
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(400).json('Unable to register');
  }
};
module.exports = {
	handleRegister: handleRegister
};
