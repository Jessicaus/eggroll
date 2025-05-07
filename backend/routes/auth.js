// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .limit(1);

  if (error || users.length === 0) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const user = users[0];
  const validPassword = await bcrypt.compare(password, user.hashed_password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});

module.exports = router;
