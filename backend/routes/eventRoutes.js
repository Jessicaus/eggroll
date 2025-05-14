// add event routes here (add event, select events for user, search?)

import express from 'express'; //imports express framework
const router = express.Router(); //creates a router

import createEvent from './../events/createEvent.js';

router.post('/create', async (req, res) => {
  console.log('Event Create Request Body:', req.body);
  try {
      const result = await createEvent(req.body);//creates a event based on what is in the body of the request
      res.status(200).json(result);//if successful, send a 200 response
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(400).json({ error: err.message, stack: err.stack });
    }
});

export default router;
