//going to add authentication based routes here (login, signup, logout?, and get user info)

import express from 'express';;//imports express framework
const router = express.Router();//creates a router
import createUser from '../../auth/createUser'
import loginUser from '../../auth/loginUser'

router.post('/register', async (req, res) => {
  try {
    const result = await createUser(req.body);//creates a user based on what is in the body of the request
    res.status(200).json(result);//if successful, send a 200 response
  } catch (err) {
    res.status(400).json({ error: err.message });//if error, send a 400 response
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
