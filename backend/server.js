import supabase from './supabaseSetup.js';
import express from 'express'; // Import the Express library
import cors from 'cors';

const app = express();

// Allow requests from your frontend's origin
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));

app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

app.use('/api/auth', authRoutes); 
app.use('/api/events', eventRoutes);

// Import Supabase database

const main = async () => { const { data, error } = await supabase.from('users').select('*')
  if (error){
    console.error('Error:', error)
  }
  else{
    // console.log('Users:', data)
  }
}

main()

// A simple test route
app.get('/', (req, res) => {
  res.send('EggRoll backend is live!');
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`EggRoll backend running!`);
});