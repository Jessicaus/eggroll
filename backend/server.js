// Import the Express library
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Import route files (TENTATIVE)
// const authRoutes = require('./routes/auth');
// const orgRoutes = require('./routes/orgs');
// const eventRoutes = require('./routes/events');
// const attendanceRoutes = require('./routes/attendance');

// Middleware: lets Express understand JSON in requests
app.use(express.json());

// Route handling (TENTATIVE): send requests to the appropriate file
// app.use('/auth', authRoutes);           // /auth/register, /auth/login
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

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
