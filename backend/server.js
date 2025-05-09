import supabase from './supabaseSetup.js';
// Import the Express library
import express from 'express';

import cors from 'cors';
import authRoutes from '../routes/authRoutes.js';

const app = express();

// Import Supabase database

const main = async () => { const { data, error } = await supabase.from('users').select('*')

if (error)
{
  console.error('Error:', error)
}

else
{
  console.log('Users:', data)
}
}

main()

// Import route files (TENTATIVE)
// const authRoutes = require('./routes/auth');
// const orgRoutes = require('./routes/orgs');
// const eventRoutes = require('./routes/events');
// const attendanceRoutes = require('./routes/attendance');

// Middleware: lets Express understand JSON in requests
app.use(cors())
app.use(express.json());

// Route handling (TENTATIVE): send requests to the appropriate file
app.use('/api/auth', authRoutes);           // /auth/register, /auth/login
// app.use('/orgs', orgRoutes);            // /orgs, /orgs/:id/join, etc.
// app.use('/events', eventRoutes);        // /events/:id/activate, etc.
// app.use('/attendance', attendanceRoutes); // /attendance/:eventId

// A simple test route
app.get('/', (req, res) => {
  res.send('EggRoll backend is live!');
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ EggRoll backend running at http://localhost:${PORT}`);
});