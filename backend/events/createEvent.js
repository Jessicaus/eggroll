import supabase from '../../supabaseSetup.js';
import { v4 as uuidv4 } from 'uuid'; // generates a random ID

export async function createEvent({ scheduler, event_name, event_start_time }) {
    // generate random 6-digit attendance code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // inserts a new row into the events table
    const { data, error } = await supabase.from('events').insert({
        id: uuidv4(),
        is_live: false,
        attendance_code: code,
        event_name,
        event_start_time,
        scheduler
    }).select();

    if (error) {
        console.error('Event creation error:', error);
        return { success: false, error: error.message };
    }

    return { success: true, event: data[0] }; // return the inserted row
}
