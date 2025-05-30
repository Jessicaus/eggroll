// add event routes here (add event, select events for user, search?)

import express from 'express'; //imports express framework
const router = express.Router(); //creates a router

import createEvent from './../events/createEvent.js';
import searchEvent from './../events/searchEvent.js';
import liveEvent from './../events/liveEvent.js';
import searchEventId from './../events/searchEventId.js';

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

router.post('/searchid', async (req, res) => {
  const { eventId } = req.body; // if user calls /search?q=concert, q = "concert"
  console.log('Event Id:', eventId);

  if (!eventId) { //given event id is empty
    return res.status(400).json({error: 'Missing event id'});
  }

  try {
    const results = await searchEventId(eventId); //searchEvent is imported from events/searchEvent.js
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching event by Id: ', err);
    res.status(500).json({ error: err.message });
  }
});


router.post('/live', async (req, res) => {
  console.log('changing live status')
  try {
    const result = await liveEvent(req.body.id, req.body.status);//change live status based on what is in the body of the request
    res.status(200).json(result);//if successful, send a 200 response
  } catch (err) {
    res.status(400).json({ error: err.message });//if error, send a 400 response
  }
});

export default router;
