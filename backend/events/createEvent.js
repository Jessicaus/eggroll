import supabase from '../../backend/supabaseSetup.js';

export default async function createEvent({ name, start_time, description, scheduler }) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  console.log({ name, start_time, description, scheduler });

  const { data, error: dbError } = await supabase.from('events').insert({
    event_start_time: start_time,
    is_live: false,
    event_name: name,
    attendance_code: code,
    details: description,
    scheduler: scheduler
  }).select();

  if (dbError) {
    throw new Error(dbError?.message || 'database insertion error');
  }

  const eventId = data[0]?.id;
  console.log('Event ID:', eventId);

  return { success: true, event: data[0] };
}
