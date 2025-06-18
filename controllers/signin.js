const handleSignin = async (req, res, supabase, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  try {
    // Step 1: Get hash from login table
    const { data: loginData, error: loginError } = await supabase
      .from('login')
      .select('hash')
      .eq('email', email)
      .single();

    if (loginError || !loginData) {
      return res.status(400).json('Wrong credentials');
    }

    const isValid = bcrypt.compareSync(password, loginData.hash);

    if (!isValid) {
      return res.status(400).json('Wrong credentials');
    }

    // Step 2: Fetch user from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return res.status(400).json('Unable to get user');
    }

    res.json(userData);
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(500).json('Internal server error');
  }
};

module.exports = {
	handleSignin: handleSignin
};
