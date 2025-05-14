import supabase from '../../backend/supabaseSetup.js'
// import { v4 as uuidv4 } from 'uuid'; // generates a random ID

export default async function createEvent({ name, start_time, scheduler }) {

    // generate random 6-digit attendance code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("i'm okay here?");
    console.log('Generated Attendance Code:', code);
    console.log("i'm okay here?");

    console.log('Inserting event with data:', {
        start_time,
        is_live: false,
        name,
        attendance_code: code,
        scheduler
    });
    // inserts a new row into the events table
    const { data, error: dbError } = await supabase.from('events').insert({
        event_start_time: start_time,
        is_live: false,
        event_name: name,
        attendance_code: code,
        scheduler
    }).select(); // Get the inserted row, including the generated ID

    if (dbError) {
        throw new Error(dbError?.message || 'database insertion error');
    }

    const eventId = data[0]?.id;  // The id of the newly inserted event
    console.log('Event ID:', eventId);  
    
    return { success: true, event: data[0] }; // return the inserted row
    //return { success: true, event: { name, start_time, attendance_code: code, scheduler } }; // return a mock event object for testing
    //return {success: true, event: { name, start_time, attendance_code: code, scheduler }};

}
