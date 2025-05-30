import express from 'express';
import supabase from '../supabaseSetup.js';

import {addAttendance} from './../attend/addAttendance.js';
import {fetchAttendance} from './../attend/fetchAttendance.js';
import {fetchEvents} from './../attend/fetchEvents.js';

const router = express.Router();

router.post('/add', async (req, res) => {
  console.log('Attendance Add Request Body:', req.body);
  try {
    const result = await addAttendance(req.body.eventId, req.body.code, req.body.userId);
    res.status(200).json(result);
  } catch (err) {
    console.error('Add Attendance Error:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.post('/fetch', async (req, res) => {
  console.log("fetching attendance data")
  try {
    const result = await fetchAttendance(req.body.eventId);
    res.status(200).json(result);
  } catch (err) {
    console.error('fetching attendance error', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.post('/events', async (req, res) => {
  console.log("viewType is: ", req.body.viewType);
  console.log("userId is: ", req.body.userId);
  try {
    const result = await fetchEvents(req.body.viewType, req.body.userId);
    res.status(200).json(result);
  } catch (err) {
    console.error('fetching attended events for user error:', err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

export default router;