import supabase from '../../backend/supabaseSetup.js';

export default async function searchEvent(eventId) {
    const { data, error } = await supabase
        .from('events') //table name
        .select('*') //select all columns
        .eq('id', eventId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}