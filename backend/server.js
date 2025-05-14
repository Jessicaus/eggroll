import supabase from './supabaseSetup.js';
import express from 'express'; // Import the Express library
import cors from 'cors';

import attendanceRoutes from './routes/attendanceRoutes.js';

const app = express();

// Allow requests from your frontend's origin
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));

app.use(express.json());

import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes); 
app.use('/api/attendance', attendanceRoutes);

// Import Supabase database

const main = async () => { const { data, error } = await supabase.from('users').select('*')
  if (error){
    console.error('Error:', error)
  }
  else{
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

// app.use(express.json());

// Route handling (TENTATIVE): send requests to the appropriate file
// app.use('/api/auth', authRoutes);           // /auth/register, /auth/login
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
  console.log(`✅EggRoll backend running!`);
});