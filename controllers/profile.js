const handleProfileGet = async (req, res, supabase) => {
  const { id } = req.params;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single(); // Expect only one result

    if (error || !user) {
      return res.status(400).json('No Such User');
    }

    res.json(user);
  } catch (err) {
    console.error('Error getting user:', err);
    res.status(400).json('Error Getting User');
  }
};
module.exports = {
	handleProfileGet: handleProfileGet
};
