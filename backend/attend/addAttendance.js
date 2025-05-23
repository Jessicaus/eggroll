import supabase from '../supabaseSetup.js';

export async function addAttendance(eventId, enteredCode, userId) {
const { data: event, error: eventError } = await supabase
    .from('events')
    .select('attendance_code, is_live')
    .eq('id', eventId)
    .single();

    if (eventError || !event) {
        return { success: false, message: 'Event not found.' };
    }

    if (!event.is_live) {
        return { success: false, message: 'Event is not live.' }; // 🟡 Live/dead check
    }
      
    if (!event.attendance_code) {
    return { success: false, message: 'Attendance code missing from event.' };
    }
      
    if (event.attendance_code !== enteredCode) {
    return { success: false, message: 'Invalid code.' };
    }
      
    const {data, error: insertError } = await supabase.from('attendance').insert([{
        event_id: eventId,
        user_id: userId,
        checked_in_at: new Date().toISOString()
    }]);
      
    if (insertError) {
        if (insertError.code === '23505') {
            return { success: false, message: 'You’ve already checked into this event.' };
        }
    }
    return { success: true, message: 'Attendance recorded.' };
}      


