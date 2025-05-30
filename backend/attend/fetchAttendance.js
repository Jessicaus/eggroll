import supabase from '../supabaseSetup.js';

export async function fetchAttendance(eventId) {
    const { data, error } = await supabase
        .from('attendance')
        .select(`
          checked_in_at,
          users (
            user_id,
            user_name,
            user_email
          )
        `)
        .eq('event_id', eventId)
        .order('checked_in_at', { ascending: true });


    if (error) {
        throw new Error(error.message);
    }

    return data;
}