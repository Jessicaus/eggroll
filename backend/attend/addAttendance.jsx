/**
 * Purpose: Validates event code and adds attendance to the database.
 */

import { supabase } from '../supabaseClient';

export async function addAttendance(eventId, enteredCode, userId) {
// get event by ID
const { data: event, error: eventError } = await supabase
    .from('events')
    .select('code, is_live')
    .eq('id', eventId)
    .single();

if (!event.is_live || event.code !== enteredCode) {
    return { success: false, message: 'Invalid code or event is not live.' };
}

// insert attendance into supabase
const { error: insertError } = await supabase
    .from('event_attendance')
    .insert([{
    event_id: eventId,
    user_id: userId,
    checked_in_at: new Date().toISOString()
    }]);

if (insertError) {
    return { success: false, message: insertError.message };
}

return { success: true, message: 'Attendance recorded.' };
}


