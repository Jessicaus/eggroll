// add event routes here (add event, select events for user, search?)

import express from 'express'; //imports express framework
const router = express.Router(); //creates a router

import createEvent from './../events/createEvent.js';
import searchEvent from './../events/searchEvent.js';

router.post('/create', async (req, res) => {
  console.log('Event Create Request Body:', req.body);
  try {
      const result = await createEvent(req.body);//creates a event based on what is in the body of the request
      res.status(200).json(result);//if successful, send a 200 response
    } catch (err) {
        console.error('Create Event Error:', err);
        res.status(400).json({ error: err.message, stack: err.stack });
    }
});

router.get('/search', async (req, res) => {
  const { q } = req.query; // if user calls /search?q=concert, q = "concert"
  console.log('Search Query:', q);

  if (!q) { //search term is empty
    return res.status(400).json({error: 'Missing search query'});
  }

  try {
    const results = await searchEvent(q); //searchEvent is imported from events/searchEvent.js
    res.status(200).json(results);
  } catch (err) {
    console.error('Search error: ', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
