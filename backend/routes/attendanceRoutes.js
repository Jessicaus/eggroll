import express from 'express';
import supabase from '../supabaseSetup.js';

import {addAttendance} from './../attend/addAttendance.js';

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

export default router;