const handleImage = async (req, res, supabase) => {
  const { id } = req.body;

  try {
    // Step 1: Get current entries count
    const { data: user, error: getError } = await supabase
      .from('users')
      .select('entries')
      .eq('id', id)
      .single();

    if (getError || !user) {
      return res.status(400).json('User not found');
    }

    const newEntries = user.entries + 1;

    // Step 2: Update entries
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ entries: newEntries })
      .eq('id', id)
      .select('entries')
      .single();

    if (updateError || !updatedUser) {
      return res.status(400).json('Unable to update entries');
    }

    res.json(updatedUser.entries);
  } catch (err) {
    console.error('Error updating entries:', err);
    res.status(400).json('Unable to get entries');
  }
};
module.exports = {
	handleImage,
};
