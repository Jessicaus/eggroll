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

// attendance page from frontend will call this to display the attendance table
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  const { data, error } = await supabase
    .from('event_attendance')
    .select('checkin_time, users(name, email)')   // Join with users table
    .eq('event_id', eventId)                      // Filter by event ID
    .order('checkin_time', { ascending: false }); // Sort by newest first

  if (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

  const formatted = data.map((entry) => ({
    name: entry.users?.name || 'Unknown',
    email: entry.users?.email || 'Unknown',
    checkin_time: entry.checkin_time,
  }));

  res.json({ success: true, attendees: formatted });
});

export default router;