// connect supabase to frontend

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kndiebwpwawxvcynupkh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZGllYndwd2F3eHZjeW51cGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMzg1MjYsImV4cCI6MjA2MTkxNDUyNn0.WT893t2VetG97TAjVnFXKrJGH7zeCh6j9KBcj30gCXg'; // From Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);