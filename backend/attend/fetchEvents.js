import supabase from '../supabaseSetup.js';

export async function fetchEvents(viewType, userId) {
    if (!viewType) throw new Error('Missing viewType');

    switch (viewType) {
        case "general":
            return await fetchGeneralEvents();
        case "hosted":
            return await fetchHostedEvents(userId);
        case "attended":
            return await fetchAttendedEvents(userId);
        default:
            return await fetchGeneralEvents();
    }
}

 // check for errors
 function handle(error, data) {
    if (error) throw new Error(error.message);
    return data;
}

async function fetchGeneralEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isoToday = today.toISOString();

    const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_start_time', isoToday)
        .order('event_start_time', { ascending: true });

    return handle(error, data);
}
async function fetchHostedEvents(userId) {
    if (!userId) throw new Error('Missing userId');
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('scheduler', userId);

    return handle(error, data);
}
async function fetchAttendedEvents(userId) {
    if (!userId) throw new Error('Missing userId');
    const { data, error } = await supabase
        .from('attendance')
        .select('events(*)')
        .eq('user_id', userId);

    return handle(error, data.map(row => row.events));  // flatten to just events
}