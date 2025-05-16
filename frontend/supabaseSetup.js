// Importing and Initializing the Supabase database in the backend
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kndiebwpwawxvcynupkh.supabase.co'
const SUPABASE_ANONKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZGllYndwd2F3eHZjeW51cGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzg1MjYsImV4cCI6MjA2MTkxNDUyNn0.WT893t2VetG97TAjVnFXKrJGH7zeCh6j9KBcj30gCXg'


const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY)

export default supabase
